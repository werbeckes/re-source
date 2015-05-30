module Api
  class SnippetsController < ApplicationController
    before_action :token_authenticate

    def index
      puts "HIT INDEX ROUTE"
      render plain: "HIT INDEX ROUTE"
    end

    def create
      render plain: "HIT CREATE ROUTE"
    end

    protected

    def token_authenticate
      authenticate_or_request_with_http_token do |token, options|
        User.find_by(auth_token: token)
      end
    end

  end
end