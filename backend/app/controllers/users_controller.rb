class UsersController < ApplicationController
  def create
    byebug
    user = User.new(params[:user])

  end
end
