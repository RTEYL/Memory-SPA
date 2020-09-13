class LeaderboardsController < ApplicationController
  def index
    leaderboard = Leaderboard.first
    render json: LeaderboardSerializer.new(leaderboard, {include: [:users]})
  end
end
