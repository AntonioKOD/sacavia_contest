import jwt from 'jsonwebtoken';

// SSO configuration
const SSO_JWT_SECRET = process.env.SSO_JWT_SECRET || 'default_sso_secret_change_in_production';
const SSO_ALGORITHM = 'HS256';

// SSO token payload interface
export interface SSOTokenPayload {
  sub: string; // User ID
  iat?: number; // Issued at
  exp?: number; // Expiration
  aud?: string; // Audience
  iss?: string; // Issuer
}

// SSO verification result
export interface SSOVerificationResult {
  sub: string; // User ID
  isValid: boolean;
  error?: string;
}

// Verify SSO token from core app
export async function verifyCoreSSO(token: string): Promise<SSOVerificationResult> {
  try {
    // Verify and decode the JWT token
    const decoded = jwt.verify(token, SSO_JWT_SECRET, {
      algorithms: [SSO_ALGORITHM],
      issuer: process.env.SSO_ISSUER || 'sacavia-core',
      audience: process.env.SSO_AUDIENCE || 'sacavia-contest',
    }) as SSOTokenPayload;

    // Check if token has required fields
    if (!decoded.sub) {
      return {
        sub: '',
        isValid: false,
        error: 'Token missing user ID (sub)',
      };
    }

    // Check if token is expired
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      return {
        sub: '',
        isValid: false,
        error: 'Token expired',
      };
    }

    return {
      sub: decoded.sub,
      isValid: true,
    };

  } catch (error) {
    let errorMessage = 'Unknown error';
    
    if (error instanceof jwt.JsonWebTokenError) {
      errorMessage = 'Invalid token';
    } else if (error instanceof jwt.TokenExpiredError) {
      errorMessage = 'Token expired';
    } else if (error instanceof jwt.NotBeforeError) {
      errorMessage = 'Token not yet valid';
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      sub: '',
      isValid: false,
      error: errorMessage,
    };
  }
}

// Create SSO token (for testing or if needed)
export async function createSSOToken(userId: string, options?: {
  expiresIn?: number;
  issuer?: string;
  audience?: string;
}): Promise<string> {
  const payload: SSOTokenPayload = {
    sub: userId,
  };

  const jwtOptions: jwt.SignOptions = {
    algorithm: SSO_ALGORITHM,
    expiresIn: options?.expiresIn || 15 * 60, // Default 15 minutes in seconds
    issuer: options?.issuer || process.env.SSO_ISSUER || 'sacavia-core',
    audience: options?.audience || process.env.SSO_AUDIENCE || 'sacavia-contest',
  };

  return jwt.sign(payload, SSO_JWT_SECRET, jwtOptions);
}

// Decode SSO token without verification (for debugging)
export function decodeSSOToken(token: string): SSOTokenPayload | null {
  try {
    return jwt.decode(token) as SSOTokenPayload;
  } catch (error) {
    return null;
  }
}

// Validate SSO configuration
export function validateSSOConfig(): boolean {
  if (!SSO_JWT_SECRET || SSO_JWT_SECRET === 'default_sso_secret_change_in_production') {
    console.warn('⚠️  SSO_JWT_SECRET is not properly configured');
    return false;
  }
  
  if (!process.env.SSO_ISSUER) {
    console.warn('⚠️  SSO_ISSUER is not configured');
  }
  
  if (!process.env.SSO_AUDIENCE) {
    console.warn('⚠️  SSO_AUDIENCE is not configured');
  }
  
  return true;
}
