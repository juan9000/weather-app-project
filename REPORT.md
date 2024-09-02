
# Setup

Currently, nuxt projects set up almost everything for you, but sometimes things get strange. Regarding Eslint, I saw a "deprecated" messages, to run the current version, I would need to enable a flag for a test feature. Because of this, I decided to go without Eslint.

The most tricky part in my case was the "useFetch" composable. I had to take some time and study a bit deeper about this composable and its options. The rest was very familiar!

I also had to make a work around at the setFavorite feature, this API don't follow the exacly same pattern on all endpoint fora giving "Object", as the "ID" is missing I had to send another value for the case that click on "search" button, without selecting any specific location (one solution was, send another request to the "search.json" endpoint, to get the ID field).
