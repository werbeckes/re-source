class SnippetsController < ApplicationController
    before_action :token_authenticate, only: [:extension_index, :extension_create]
    #skip because we have no snippet form
    skip_before_filter :verify_authenticity_token

    def login
      user = User.find_by_email(params[:email])
      if user && user.authenticate(params[:password])
        render json: {username: user.username, auth_token: user.auth_token}
      else
        render plain: "INVALID CREDENTIALS", status: 401
      end
    end

    def extension_index
      render plain: "HIT INDEX (PREFLIGHT) ROUTE"
    end

    def extension_create
      user = token_authenticate
      @snippet = Snippet.create(text: params[:body], web_url: params[:snippetUrl], description: params[:pageTitle], user_id: user.id)
      @snippet.get_cached_url
      render plain: "Created Snippet"
    end

    def create
      @note = Note.find_by_id(params[:note_id])
      @snippet = @note.snippets.new(snippet_params)
      if @snippet.save
        @snippet.get_cached_url
        render json: @snippet
      else
        #TODO catch and return errors
      end
    end

    def index
      @snippets = Note.find_by(id: params[:note_id]).snippets
      render json: @snippets.to_a
    end

    def update
      @snippet = Snippet.find_by_id(params[:id])
      @snippet.update(snippet_params)
      render nothing: true
    end

    def destroy
      Snippet.find_by_id(params[:id]).destroy
      render nothing: true
    end

    def unassigned
      puts "<><><><><><><><><><><><><><><><><><><><><><><><><>HITTING UNASSIGNED IN SNIPPETS CONTROLLER<><><><><><><><><><><><><><><><><><><><><><><><><>"
      if logged_in? && current_user.id == params[:user_id].to_i
        @snippets = current_user.unassigned_snippets
        puts "<><><><><><><><><><><><><><><><><><><><><><><><><>HITTING UNASSIGNED IN IF STATEMENT in SNIPPETS CONTROLLER<><><><><><><><><><><><><><><><><><><><><><><><><>"
        p @snippets
         puts "<><><><><><><><><><><><><><><><><><><><><><><><><>HITTING UNASSIGNED IN IF STATEMENT in SNIPPETS CONTROLLER<><><><><><><><><><><><><><><><><><><><><><><><><>"
        render json: @snippets.to_a
      else
        render nothing: true
      end
    end

    protected

    def token_authenticate
      authenticate_or_request_with_http_token do |token, options|
        User.find_by(auth_token: token)
      end
    end

    def snippet_params
      params.require(:snippet).permit(:web_url, :description, :text, :note_id)
    end

end
