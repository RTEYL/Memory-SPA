class UsersController < ApplicationController
  def create
    user = User.find_or_create_by(username: user_params(params)[:username])
    if user
      render json: UserSerializer.new(user)
    else
      render json: {errors: user.errors.full_messages}
    end
  end
  def update
    user = User.find_by_id(user_params(params)[:id])
    if user
      user.update(user_params(params))
      render json: UserSerializer.new(user)
    else
      render json: {errors: user.errors.full_messages}
    end
  end

  private

  def user_params(params)
    params.require(:user).permit(:id, :username, :score, :leaderboard_id)
  end
end
