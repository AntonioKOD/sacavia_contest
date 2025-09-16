import { Trophy, MapPin, Camera, CreditCard, Users, Award, Clock, Shield } from 'lucide-react';

export default function HowToEnterPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            How to Enter
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Follow these simple steps to enter your city's best-kept secret and compete for $50,000+ in prizes
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Step 1 */}
          <div className="text-center">
            <div className="text-6xl font-light text-gray-900 mb-6">1</div>
            <h3 className="text-2xl font-medium text-gray-900 mb-4">
              Add a Hidden Gem on Sacavia.com
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Go to <a href="https://sacavia.com/add-location" className="text-gray-900 hover:underline font-medium" target="_blank" rel="noopener noreferrer">sacavia.com/add-location</a> and create a detailed entry for your favorite local spot.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg max-w-xl mx-auto">
              <h4 className="font-medium text-gray-900 mb-3">What to Include:</h4>
              <ul className="text-sm text-gray-600 space-y-2 text-left">
                <li>• High-quality photos or videos of the location</li>
                <li>• Compelling description of why it's special</li>
                <li>• Accurate address and contact information</li>
                <li>• Relevant categories and tags</li>
                <li>• Insider tips and best times to visit</li>
              </ul>
            </div>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="text-6xl font-light text-gray-900 mb-6">2</div>
            <h3 className="text-2xl font-medium text-gray-900 mb-4">
              Opt Into the Contest
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              After filling out your location details, click the "Enter Contest" button to opt into the competition.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg max-w-xl mx-auto">
              <h4 className="font-medium text-gray-900 mb-3">Contest Entry Fee: $20</h4>
              <p className="text-sm text-gray-600">
                This fee covers contest administration and helps fund the prize pool. Your entry becomes a permanent Hidden Gem on Sacavia.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="text-6xl font-light text-gray-900 mb-6">3</div>
            <h3 className="text-2xl font-medium text-gray-900 mb-4">
              Complete Payment
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              You'll be redirected to secure Stripe checkout to complete your $20 contest entry payment.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg max-w-xl mx-auto">
              <h4 className="font-medium text-gray-900 mb-3">Secure Payment:</h4>
              <ul className="text-sm text-gray-600 space-y-2 text-left">
                <li>• Secure Stripe payment processing</li>
                <li>• Multiple payment methods accepted</li>
                <li>• Instant confirmation</li>
                <li>• Entry immediately becomes contest eligible</li>
              </ul>
            </div>
          </div>

          {/* Step 4 */}
          <div className="text-center">
            <div className="text-6xl font-light text-gray-900 mb-6">4</div>
            <h3 className="text-2xl font-medium text-gray-900 mb-4">
              Your Entry Goes Live
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              After successful payment, your entry automatically appears on the contest voting hub at vote.sacavia.com.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg max-w-xl mx-auto">
              <h4 className="font-medium text-gray-900 mb-3">What Happens Next:</h4>
              <ul className="text-sm text-gray-600 space-y-2 text-left">
                <li>• Entry appears on the public voting hub</li>
                <li>• Anyone can vote (requires free Sacavia account)</li>
                <li>• Public votes count for 50% of final score</li>
                <li>• Expert judges evaluate for remaining 50%</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Prize Information */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-3xl font-light text-gray-900 mb-8 text-center">Prize Structure</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">🏆 Major Prizes</h3>
                <ul className="space-y-3 text-gray-600">
                  <li>• <strong>Grand Prize:</strong> $25,000</li>
                  <li>• <strong>City Winners:</strong> $2,000 each (up to 10 cities)</li>
                  <li>• <strong>Category Minis:</strong> $1,000 each (Food, Outdoors, Art, Nightlife, "Weird & Wonderful")</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">🎁 Weekly & Voter Prizes</h3>
                <ul className="space-y-3 text-gray-600">
                  <li>• <strong>Weekly Trending:</strong> $100-$500 to top entry</li>
                  <li>• <strong>Voter Raffles:</strong> 10 random voters/week get $20</li>
                  <li>• <strong>Referral Bonus:</strong> Get $20 back when 5 friends enter</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Rules & Eligibility */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-3xl font-light text-gray-900 mb-8 text-center">Rules & Eligibility</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">Eligibility</h3>
                <ul className="space-y-3 text-gray-600">
                  <li>• Must be 18 years or older</li>
                  <li>• One owner per entry</li>
                  <li>• Maximum 3 entries per person</li>
                  <li>• Original content and media only</li>
                  <li>• Permitted locations only</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">Judging Criteria</h3>
                <ul className="space-y-3 text-gray-600">
                  <li>• <strong>Originality/Uniqueness:</strong> 30%</li>
                  <li>• <strong>Community Value:</strong> 25%</li>
                  <li>• <strong>Storytelling & Clarity:</strong> 25%</li>
                  <li>• <strong>Media Quality:</strong> 20%</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-3xl font-light text-gray-900 mb-8 text-center">Contest Timeline</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-light text-gray-900 mb-3">1</div>
                <h3 className="font-medium text-gray-900 mb-2">Submissions Open</h3>
                <p className="text-sm text-gray-600">4-6 weeks</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-light text-gray-900 mb-3">2</div>
                <h3 className="font-medium text-gray-900 mb-2">Voting Window</h3>
                <p className="text-sm text-gray-600">Throughout + 1 week</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-light text-gray-900 mb-3">3</div>
                <h3 className="font-medium text-gray-900 mb-2">Judging</h3>
                <p className="text-sm text-gray-600">1 week</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-light text-gray-900 mb-3">4</div>
                <h3 className="font-medium text-gray-900 mb-2">Winners</h3>
                <p className="text-sm text-gray-600">Announced</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="https://sacavia.com/add-location"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-black text-white px-8 py-4 text-lg font-medium hover:bg-gray-800 transition-colors duration-200"
          >
            Start Your Entry Now
          </a>
          <p className="text-gray-600 mt-6 text-lg">
            Ready to share your city's best-kept secret? Create your entry on Sacavia.com
          </p>
        </div>
      </div>
    </div>
  );
}
