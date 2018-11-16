class Recipe < ApplicationRecord
  has_many :fridges
  has_many :books
end
