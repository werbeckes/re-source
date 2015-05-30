class User < ActiveRecord::Base
  has_many :journeys
  has_many :categories, through: :journeys
  has_many :notes, through: :categories
  has_many :snippets, through: :notes

  has_secure_password

end
