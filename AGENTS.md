<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

Keep the supplied Kutanga reference page as a single content route at `/`; its source markup lives in `src/reference-content.html` and its design tokens and generated utilities live in `src/styles.css` to preserve the exact visual treatment.
Netlify serves a pre-rendered, script-free static copy from dist/client (build:netlify pre-renders "/", strips app scripts except the Meta Pixel, adds a vanilla countdown, and mirrors Lovable images) because the build targets Workers and client re-rendering misbehaved there.
