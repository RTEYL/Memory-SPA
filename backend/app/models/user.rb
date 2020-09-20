class User < ApplicationRecord
  belongs_to :leaderboard
  def new_high_score(score)
    (self.highest_score < score) ? (self.highest_score = score) : self.highest_score
  end
end
