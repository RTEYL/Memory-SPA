class AddHighestScoreToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :highest_score, :integer, default: 0
  end
end
