class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :username, :score, :id, :highest_score
end
