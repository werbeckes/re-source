class Journey < ActiveRecord::Base
  belongs_to :user
  has_many :categories
  has_many :notes, through: :categories
  has_many :snippets, through: :notes
end
