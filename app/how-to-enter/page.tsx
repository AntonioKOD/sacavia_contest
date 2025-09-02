import { Trophy, MapPin, Camera, CreditCard, Users, Award, Clock, Shield } from 'lucide-react';

export default function HowToEnterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            How to Enter the Hidden Gems Contest
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Follow these simple steps to enter your city's best-kept secret and compete for $50,000+ in prizes
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Step 1 */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
            <div className="flex items-start space-x-4">
              <div className="bg-frontend-primary text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <MapPin className="w-6 h-6 mr-2 text-frontend-primary" />
                  Add a Hidden Gem on Sacavia.com
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Go to <a href="https://sacavia.com/add-location" className="text-frontend-primary hover:underline font-semibold" target="_blank" rel="noopener noreferrer">sacavia.com/add-location</a> and create a detailed entry for your favorite local spot.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">What to Include:</h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li>• High-quality photos or videos of the location</li>
                    <li>• Compelling description of why it's special</li>
                    <li>• Accurate address and contact information</li>
                    <li>• Relevant categories and tags</li>
                    <li>• Insider tips and best times to visit</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
            <div className="flex items-start space-x-4">
              <div className="bg-frontend-primary text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Trophy className="w-6 h-6 mr-2 text-frontend-primary" />
                  Opt Into the Contest
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  After filling out your location details, click the "Enter Contest" button to opt into the competition.
                </p>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Contest Entry Fee: $20</h4>
                  <p className="text-sm text-green-800 dark:text-green-200">
                    This fee covers contest administration and helps fund the prize pool. Your entry becomes a permanent Hidden Gem on Sacavia.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
            <div className="flex items-start space-x-4">
              <div className="bg-frontend-primary text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <CreditCard className="w-6 h-6 mr-2 text-frontend-primary" />
                  Complete Payment
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  You'll be redirected to secure Stripe checkout to complete your $20 contest entry payment.
                </p>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Secure Payment:</h4>
                  <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
                    <li>• Secure Stripe payment processing</li>
                    <li>• Multiple payment methods accepted</li>
                    <li>• Instant confirmation</li>
                    <li>• Entry immediately becomes contest eligible</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
            <div className="flex items-start space-x-4">
              <div className="bg-frontend-primary text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Users className="w-6 h-6 mr-2 text-frontend-primary" />
                  Your Entry Goes Live
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  After successful payment, your entry automatically appears on the contest voting hub at vote.sacavia.com.
                </p>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">What Happens Next:</h4>
                  <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
                    <li>• Entry appears on the public voting hub</li>
                    <li>• Anyone can vote (requires free Sacavia account)</li>
                    <li>• Public votes count for 50% of final score</li>
                    <li>• Expert judges evaluate for remaining 50%</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Prize Information */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-gradient-to-r from-frontend-primary to-frontend-secondary rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-6 text-center">Prize Structure</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold mb-3">🏆 Major Prizes</h3>
                <ul className="space-y-2">
                  <li>• <strong>Grand Prize:</strong> $25,000</li>
                  <li>• <strong>City Winners:</strong> $2,000 each (up to 10 cities)</li>
                  <li>• <strong>Category Minis:</strong> $1,000 each (Food, Outdoors, Art, Nightlife, "Weird & Wonderful")</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">🎁 Weekly & Voter Prizes</h3>
                <ul className="space-y-2">
                  <li>• <strong>Weekly Trending:</strong> $100-$500 to top entry</li>
                  <li>• <strong>Voter Raffles:</strong> 10 random voters/week get $20</li>
                  <li>• <strong>Referral Bonus:</strong> Get $20 back when 5 friends enter</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Rules & Eligibility */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">Rules & Eligibility</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-frontend-primary" />
                  Eligibility
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Must be 18 years or older</li>
                  <li>• One owner per entry</li>
                  <li>• Maximum 3 entries per person</li>
                  <li>• Original content and media only</li>
                  <li>• Permitted locations only</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-frontend-primary" />
                  Judging Criteria
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
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
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">Contest Timeline</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-frontend-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Submissions Open</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">4-6 weeks</p>
              </div>
              <div className="text-center">
                <div className="bg-frontend-secondary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Voting Window</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Throughout + 1 week</p>
              </div>
              <div className="text-center">
                <div className="bg-frontend-accent text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Judging</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">1 week</p>
              </div>
              <div className="text-center">
                <div className="bg-frontend-success text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Trophy className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Winners</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Announced</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="https://sacavia.com/add-location"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-frontend-primary hover:bg-frontend-primary/90 text-white px-8 py-4 text-xl font-semibold rounded-lg transition-colors duration-200"
          >
            Start Your Entry Now
          </a>
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            Ready to share your city's best-kept secret? Create your entry on Sacavia.com
          </p>
        </div>
      </div>
    </div>
  );
}
