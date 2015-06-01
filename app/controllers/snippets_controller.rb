class SnippetsController < ApplicationController
    before_action :token_authenticate, only: [:extension_index, :extension_create]
    #skip because we have no snippet form
    skip_before_filter :verify_authenticity_token
    def login
      puts "HIT LOGIN ROUTE"
      user = User.find_by_email(params[:email])
      if user && user.authenticate(params[:password])
        render json: {username: user.username, auth_token: user.auth_token}
      else
        render plain: "INVALID CREDENTIALS", status: 401
      end
    end

    def extension_index
      puts "HIT INDEX ROUTE"
      render plain: "HIT INDEX (PREFLIGHT) ROUTE"
    end

    def extension_create
      puts "<><><><><><><><><><><><><><><><><><><><><><><>"
      puts "CREATING SNIPPET"
      # p token_authenticate
      puts "<><><><><><><><><><><><><><><><><><><><><><><>"
      user = token_authenticate
      Snippet.create(text: params[:body], web_url: params[:snippetUrl], user_id: user.id)
      render plain: "Created Snippet"
    end

    def create
      @note = Note.find_by_id(params[:note_id])
      @snippet = @note.snippets.new(snippet_params)
      if @snippet.save
        puts "We won!!!"
        render json: @snippet
      else
        #TODO catch and return errors
      end
    end

    def update
    end

    def destroy
      Note.find_by_id(params[:id]).destroy
      render json: " "
    end

    protected

    def token_authenticate
      authenticate_or_request_with_http_token do |token, options|
        User.find_by(auth_token: token)
      end
    end

    def snippet_params
      params.require(:snippet).permit(:web_url, :description, :text)
    end

end