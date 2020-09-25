# Memory-SPA
Memory-SPA is a Ruby On Rails backend api that stores and respsonds user/leaderboard json data, the JavaScript frontened is a game in wich a user is to remember a given pattern and respond via click to match said pattern

##Installation
Fork and clone this repo install dependencies with
```bash
$bundle install
```
##Usage
to play around with the app use
```bash
$rails s
```
migrate the database with
```bash
$rails db:migrate
```
open the HTML in the browser.
 Enter a username and select a dificulty to start playing.
 A random box will highlight
 Click on the correct box.
 After the next box is highlighted click on the first box, then the newly highlighted box.
repeat until failure and the points will be displayed on the leaderboard

##Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

##License
[MIT](https://choosealicense.com/licenses/mit/)