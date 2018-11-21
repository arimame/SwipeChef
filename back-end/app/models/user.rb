class User < ApplicationRecord

has_secure_password

has_many :fridges
has_many :books
end
