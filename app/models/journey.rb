class Journey < ActiveRecord::Base
  belongs_to :user
  has_many :categories, dependent: :destroy
  has_many :notes, through: :categories
  has_many :snippets, through: :notes

  validates :title, presence: true
  # validates :description, presence: true
end
