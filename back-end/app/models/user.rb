class User < ApplicationRecord
  has_secure_password

  has_many :fridges
  has_many :books

  validates :username, length: { minimum: 3 }

  validates :username, uniqueness: true
  validates :email, uniqueness: true

  validates :password_digest, presence: true


  def self.authenticate_with_credentials(email, password)
    email = self.login_email_validation(email)

    user = User.find_by_email(email)

    if user && user.authenticate(password)
      return user
    else
      return nil
    end
  end


  private
  def email_validation
    self.email = email.downcase
  end

  def self.login_email_validation(email)
    email.delete(' ').downcase
  end

end
