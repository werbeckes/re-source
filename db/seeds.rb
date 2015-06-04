
users_seed = [
  ['Brant', 'Faulkner', 'brantdfaulkner@gmail.com', 'password', 'BrantFaulkner'],
  ['Christian', 'Barentine', 'cbarentine@gmail.com', 'password', 'ChristianBarentine'],
  ['Jim', 'Joyce', 'j.joyce92@gmail.com', 'password', 'JimJoyce'],
  ['Nathan', 'Werbeckes', 'werbeckes@gmail.com', 'password', 'NathanWerbeckes']
]

journeys_seed = [
  ['Ruby', 'Dynamic, open source programming language with a focus on simplicity and productivity.', true],
  ['HTML', 'Standardized system for tagging text files to achieve font, color, graphic, and hyperlink effects web pages', true],
  ['CSS', 'Style sheet language used for describing the look and formatting of a document written in a markup language.', true],
  ['JavaScript', 'Object-oriented language commonly used to create interactive effects within web browsers', true],
  ['AngularJS', "Structural framework for dynamic web apps. Uses HTML as the template language and extends HTML's syntax to express an application's components clearly and succinctly.", true]
]

categories_seed = [
  ['Syntax', 'Love to remember grammar', true],
  ['Purpose', 'What type of hammer do I have.', true],
  ['Common Methods', 'Frequently used basic methods', true],
  ['Enumerables', 'How do I itterate?', true],
  ['Used in concert with', 'What languages is this commonly paired with to acheive functionaily', true]
]

notes_seed = [
  ['Page One Title', 'This is a Synopsis for Page One, This is a Synopsis for Page One, This is a Synopsis for Page One, This is a Synopsis for Page One, This is a Synopsis for Page One', 'This is a Code Sampe for Page One, This is a Code Sampe for Page One, This is a Code Sampe for Page One, This is a Code Sampe for Page One, This is a Code Sampe for Page One', true],
  ['Page Two Title', 'This is a Synopsis for Page Two, This is a Synopsis for Page Two, This is a Synopsis for Page Two, This is a Synopsis for Page Two, This is a Synopsis for Page Two', 'This is a Code Sampe for Page Two, This is a Code Sampe for Page Two, This is a Code Sampe for Page Two, This is a Code Sampe for Page Two, This is a Code Sampe for Page Two', true],
  ['Page Three Title', 'This is a Synopsis for Page Three, This is a Synopsis for Page Three, This is a Synopsis for Page Three, This is a Synopsis for Page Three, This is a Synopsis for Page Three', 'This is a Code Sampe for Page Three, This is a Code Sampe for Page Three, This is a Code Sampe for Page Three, This is a Code Sampe for Page Three, This is a Code Sampe for Page Three', true],
  ['Page Four Title', 'This is a Synopsis for Page Four, This is a Synopsis for Page Four, This is a Synopsis for Page Four, This is a Synopsis for Page Four, This is a Synopsis for Page Four', 'This is a Code Sampe for Page Four, This is a Code Sampe for Page Four, This is a Code Sampe for Page Four, This is a Code Sampe for Page Four, This is a Code Sampe for Page Four', true],
  ['Page Five Title', 'This is a Synopsis for Page Five, This is a Synopsis for Page Five, This is a Synopsis for Page Five, This is a Synopsis for Page Five, This is a Synopsis for Page Five', 'This is a Code Sampe for Page Five, This is a Code Sampe for Page Five, This is a Code Sampe for Page Five, This is a Code Sampe for Page Five, This is a Code Sampe for Page Five', true]
]

snippets_seed = [
  ['This is a snippet of text from the first resource I found. This is a snippet of text from the first resource I found. This is a snippet of text from the first resource I found. This is a snippet of text from the first resource I found. This is a snippet of text from the first resource I found.', 'Description of my first snippet.', 'https://github.com/user/first-snippet-source'],
  ['This is a snippet of text from the second resource I found. This is a snippet of text from the second resource I found. This is a snippet of text from the second resource I found. This is a snippet of text from the second resource I found. This is a snippet of text from the second resource I found.', 'Description of my second snippet.', 'https://github.com/user/second-snippet-source'],
  ['This is a snippet of text from the third resource I found. This is a snippet of text from the third resource I found. This is a snippet of text from the third resource I found. This is a snippet of text from the third resource I found. This is a snippet of text from the third resource I found.', 'Description of my third snippet.', 'https://github.com/user/third-snippet-source']
]

users_seed.each do |first_name, last_name, email, password, username|
  new_user = User.create!(first_name: first_name, last_name: last_name, email: email, password: password, username: username)

  journeys_seed.each do |title, description, public_bool|
    new_journey = new_user.journeys.create!(title: title, description: description, public_bool: public_bool)

    categories_seed.each do |title, description, public_bool|
      new_category = new_journey.categories.create!(title: title, description: description, public_bool: public_bool)

      notes_seed.each do |title, synopsis, code, public_bool|
        new_note = new_category.notes.create!(title: title, synopsis: synopsis, code: code, public_bool: public_bool)

        snippets_seed.each do |text, description, web_url|
          new_snippet = new_note.snippets.create!(text: text, description: description, web_url: web_url)
        end
      end
    end
  end
end



