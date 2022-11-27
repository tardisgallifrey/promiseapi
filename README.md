# Fetch from an API with promise style then's

I have struggled for a long with with doing API fetch's correctly.  The result is I am constantly having to look up how to write one after I've failed several times. I have decided to sit down and write one API after another until I can write one consistently without looking up how to do so.

This small [React](https://reactjs.org) app is the culmination of that effort.  This way of writing an API component works.  It also does what I"ve seen quoted so many times in tutorials:

fetch always returns a promise,
fetch always returns a promise.

So, I went looking for how Promises worked in JavaScript.  some of the fetch boilerplate I've seen is similar, but not exact.  The problem of recognizing the promise is that when using Promise methods, consuming code functions are optional. I'll explain.

A [Promise](https://www.w3schools.com/Js/js_promise.asp) has two major parts, producing code and consuming code.  The consuming code is assumed to take some time to be 'fulfilled'.  The promise returned by `fetch()` promises us valid data when the fetch is fulfilled. 

MAJOR POINT: The `fetch()` is the producing code and it returns a promise of valid data.

Now, we need to consume the promise to get at the data.  For that we use `.then( )`.  In the literature, the "then" is really a function/method with two parameters, a callback function for when the promise resolves normally, and a function for when the promise resolves in error.  You could think of it simply as something like this:

`fetch(url,options)`
`     .then( resolve(), error() )`

Now, that's not how our fetches normally look, I'll agree.  But, coming from a person that knows C/C++ pretty well, this makes perfect sense.  What we often do see when a fetch is written using a promise is this:

`fetch(url,options)`
`      .then( response => response.json())`
`      .then( response => setData(response))`

There are a great many things missing here.  And, it's OK if they are.  However, if you are trying to learn something, sticking to a norm can be helpful.  That was my problem.  I couldn't tell from the construct above what parts of the promise consuming code this was.

So, I have begun to write mine this way.  Clumsy, but all the parts are in place.  Yes, I do like lambda statements, but sometimes they leave things out of the picture that are better kept.

`fetch(url,options)`
`     .then( (fetchResolved) => { return fetchResolved.json() },`
`             (fetchErrored) => { alert(fetchErrored) }`
`             )`
`      .then( (jsonParseResolved) => { setData(jsonParseResolved) },`
`             (jsonParseErrored) => { alert(jsonParseErrored) }`
`             )`

Those words like fetchResolved and jsonParseResolved are not special.  We get to pick the names of parameters in functions.  These names help me to see the flow of data through the Promise.  My resolution choices in the function bodies are simple and usually fit my needs, but whatever you needed to occur would go in these anonymous function bodies.  The return in the first `.then` helps remind me that it returns a promise just like the producing code does, which is why I need to the second `.then`.  SetData is part of a `useState()` pair I've already set up.  Read about them.  They are easy to use, I think.  And, this all has to go inside a `useEffect()` function which I don't have time for here.

Fetching API data can seem daunting.  You are always asking for data that could be far away.  You don't want your app to stop dead waiting on it to come back, so we use `fetch()`.  Fetch gets the data and while it does so, we are given a Promise.  We can consume that data when it arrives in a `.then()` method.  Though parts of the method are optional, I think we can learn better coding skills by leaving in that which is optional to see what our code should or should not be doing.