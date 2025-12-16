# [Poké Poyo Wiki](bluedemontr.github.io/se3355-midterm/)

Made for the midterm of the SE 3355.

## Used Technologies
- React
	+ React Router (for navigation)
	+ Redux (for permanent storage)
	+ Axios (for api calls)
	+ Tailwind (for styling)
- PokéApi (for data)
- Wikipedia api (for the mainpage summary)

## Project Structure
> this is kinda the first time I've used tailwind on a scale larger than a single page, in my other projects I do kinda prefer using styled-components and passing props, creating different components to stop prop drilling, in this project I tried to emulate that as much as possible to not break my workflow and keep stuff readable. So I don't know if I'm following convention or not.
- src
	+ assets: images used in the website
	+ components: reusable react components, from as basic as \<Text> to entire reusable pages
	+ containers: used for handling navigation, in this project since there isn't a different flow only holds \<Wiki />
	+ lib: reusable functions and objects
		* styles: styles stored on an object of arrays to have a more central area to have styles stored in
	+ screens: different screens of the page
	+ services: handling complex api calls
	+ store: redux store and reducers to handle permanent storage
	
## Shortcomings
- Since the PokéApi does not include any utilities for searching, which I did not realize until I implemented a search utility, the only way to do so is to pull a lot of data until you get what you want, this causes a long load time to occur if you open the website and immediately filter by Gen IX. I did not realize how many endpoints Pokémon specifically would have their properties split in. In hindsight, the Pokémon tab should've probably used `/pokemon-species/` instead of `/pokemon/`
- Since the website is hosted on github pages I had to use HashRouter instead of BrowserRouter to stop the website throwing a 404 error when refreshing
- I really dislike how the scrollbar shifts the layout