![](https://img.shields.io/badge/Built%20with%20%E2%9D%A4%EF%B8%8F-at%20Technologiestiftung%20Berlin-blue)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

# QTrees Supabase

This is the Supabase.com setup for the QTrees project. It uses edge functions to pass requests through to another API created using [Postgrest](https://postgrest.org/en/stable/). Since this API is not public and there are no docs for it you won't be able to use the edge functions from this repo.

## Prerequisites

- supabase account
- supabase cli
- Secondary API and Database (out of scope for these docs)

## Installation

```bash
git clone <repository>
```

## Deployment

Before you can deploy the project to the Supabase.com, you need to:

- Login using the supabase cli
- Create a new project using the supabase dashboard
- Enable `postgis` and `moddatetime` in the dashboard for your database
- Obtain you project ref/id (find it in the URL)
- Obtain your project database url (looks like this `postgresql://postgres:[YOUR-PASSWORD]@db.[abcdefghijklmnopqrst].supabase.co:5432/postgres`)
- Create two copies of .env.defaults and name them `.env` and `.env.local` and fill in the blanks

```bash
cd <repository>
supabase link --project-ref <abcdefghijklmnopqrst>
supabase db remote set <remote database connection url>
supabase db push # [--dry-run]
supabase functions deply ml-api-passthrough
```

## Development

```bash
cd <repository>
supabase start
supabase functions serve ml-api-passthrough --env-file ./supabase/.env.local
```

### Make requests to the passthrough API

- Fill in your anon token
- Fill in your project ref

Hint: Requests without `gml_id` searchParams are rejected.

```bash
curl -L -X POST 'https://[abcdefghijklmnopqrst].functions.supabase.co/ml-api-passthrough/trees?gml_id=eq.1' -H 'Authorization: Bearer [YOUR ANON KEY]'
```

## Tests

None yet :(

## Contributing

## Contributors

Thanks goes to these wonderful people
([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://fabianmoronzirfas.me/"><img src="https://avatars.githubusercontent.com/u/315106?v=4?s=64" width="64px;" alt=""/><br /><sub><b>Fabian Morón Zirfas</b></sub></a><br /><a href="https://github.com/technologiestiftung/template-default/commits?author=ff6347" title="Documentation">📖</a></td>
    <td align="center"><a href="http://vogelino.com"><img src="https://avatars.githubusercontent.com/u/2759340?v=4?s=64" width="64px;" alt=""/><br /><sub><b>Lucas Vogel</b></sub></a><br /><a href="https://github.com/technologiestiftung/template-default/commits?author=vogelino" title="Documentation">📖</a> <a href="#ideas-vogelino" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/technologiestiftung/template-default/pulls?q=is%3Apr+reviewed-by%3Avogelino" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/technologiestiftung/template-default/commits?author=vogelino" title="Code">💻</a></td>
    <td align="center"><a href="http://www.awsm.de"><img src="https://avatars.githubusercontent.com/u/434355?v=4?s=64" width="64px;" alt=""/><br /><sub><b>Ingo Hinterding</b></sub></a><br /><a href="https://github.com/technologiestiftung/template-default/commits?author=Esshahn" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the
[all-contributors](https://github.com/all-contributors/all-contributors)
specification. Contributions of any kind welcome!

## Content Licensing

Texts and content available as
[CC BY](https://creativecommons.org/licenses/by/3.0/de/).

Illustrations by Maria Musterfrau, all rights reserved.

## Credits

<table>
  <tr>
    <td>
      Made by <a src="https://citylab-berlin.org/de/start/">
        <br />
        <br />
        <img width="200" src="https://citylab-berlin.org/wp-content/uploads/2021/05/citylab-logo.svg" />
      </a>
    </td>
    <td>
      A project by <a src="https://www.technologiestiftung-berlin.de/">
        <br />
        <br />
        <img width="150" src="https://citylab-berlin.org/wp-content/uploads/2021/05/tsb.svg" />
      </a>
    </td>
    <td>
      Supported by <a src="https://www.berlin.de/rbmskzl/">
        <br />
        <br />
        <img width="80" src="https://citylab-berlin.org/wp-content/uploads/2021/12/B_RBmin_Skzl_Logo_DE_V_PT_RGB-300x200.png" />
      </a>
    </td>
  </tr>
</table>

## Related Projects
