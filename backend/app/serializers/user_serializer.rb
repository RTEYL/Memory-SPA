class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :username, :score, :id
end
