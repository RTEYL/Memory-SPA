# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
leaderboard = Leaderboard.create
user1 = User.create(leaderboard_id: 1, username: 'tj', score: 0, highest_score: 0)
user2 = User.create(leaderboard_id: 1, username: 'j', score: 0, highest_score: 0)
user3 = User.create(leaderboard_id: 1, username: 'ty', score: 0, highest_score: 0)
user4 = User.create(leaderboard_id: 1, username: 'lmno', score: 0, highest_score: 0)