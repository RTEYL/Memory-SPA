class LeaderboardSerializer
  include FastJsonapi::ObjectSerializer
  has_many :users
end
