class UsersController < ApplicationController
  def create
    user = User.find_or_create_by(user_params(params))
  end

  private

  def user_params(params)
    params.require(:user).permit(:username, :score, :leaderboard_id)
  end
end
