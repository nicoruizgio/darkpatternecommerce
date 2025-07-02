# Automated Shopping Dark Pattern Agent

Analyse how dark patterns manifest in AI assisted shopping.

An automated agent which assists you while shopping.

<video width="640" height="360" controls>
  <source src="docs/assets/LLM_Shopping.mov" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Idea

Analyse dark patterns on the conversational agents using automated shopping assistant

## How to get started:

For the frontend run:

```
   npm i
   npm run dev
```

For the backend you can see specific commands in /backend

If you have Docker installed, use docker compose up to start the server.

Otherwise run:

```
   npm i
   npm run start:dev
```

You still need a database to store the prompts, you can choose different databases. For this example we are using postgresql, but other data sources are possible as well.

## Roadmap

- Improve prompts for dark patterns
- Add more customization to the agent to interact with products catalog
- Add option ot configure multiple LLMs model (Currently only OpenAI is supported)
- Migrate frontend to Typescript.
