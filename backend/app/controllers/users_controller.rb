class UsersController < ApplicationController
  def create
    user = User.find_or_create_by(user_params(params))
    if user
      render json: UserSerializer.new(user)
    else
      render json: {errors: user.errors.full_messages}
    end
  end
  def update
    byebug
    user = User.update(user_params(params))
    if user
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
