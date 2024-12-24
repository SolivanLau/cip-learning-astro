# Learnings

## 📝 Project Overview

This is a project based on a series of Coding In Publics <a href="https://learnastro.dev/">Learn Astro Series</a>, focusing on ADD GOAL HERE

## Learning Concept

This should be a section to add relevant learning concepts from the astro.

## CSS: BEM Naming Conventions Keeps Code DRY

It's true - BEM naming conventions keep your CSS DRY. This is mainly because regardless of you reading or writing code, the names you see and add will always be predictable, creating a consistent dev experience.

In this small project, I found that the idea of having a BLOCK as a reset class really set things into perspective.For instance take a look at the button component:

```css
.button {
	/* reset styles */
}

.button--primary {
	/* primary button styles */
}

.button--secondary {
	/* secondary button styles */
}
```

> The idea is that button resets the element to act like a button. From cursors, to stripping the default styles. We can then add additional styles, or the styles we actually want to see onto modifier classes, **.button-primary** and **.button--secondary**.

```html
<button class="button button--primary">Primary</button>
```

The classes are a little repetitive, but it is worth the trade off for predictability.

## CSS: Local Variables!

Using local variables works very well with CSS BEM naming conventions! It allows us to create modifier classes without having to repeat styles over and over again.

The idea is to think of the _BLOCK_ class as a reset class - the basis of how we modify styles.

```css
.button {
	--_clr: ;
	--_bg: ;
	--_bdr: ;
	color: var(--_clr);
	background-color: var(--_bg);
	border: var(--_bdr);
}
```

This is a setup - we assign local variables to properties to establish what variable affects what property.

We can then redefine these variables in different instances such as:

- a new modifier class `button--primary`
- a new breakpoint `@media(min-width: ...)`
- new states: `hover`, `focus-visible`, `active`

```scss
// manual reset class
.button {
	--_clr: ;
	--_bg-clr: ;
	--_bdr-clr: ;

	background-color: var(--_bg-clr);
	border: 2px solid var(--_bdr-clr);
	color: var(--_clr);
	padding: 0.5rem 1rem;
	border-radius: var(--bdr-radius);
	cursor: pointer;

	transition: filter 200ms ease-in-out;

	// HOVER AND FOCUS STATES
	&:hover,
	&:focus-visible {
		filter: brightness(90%);
	}

	// ACTIVE STATES
	&:active {
		filter: brightness(80%);
	}
}

// filled
.button--primary {
	--_clr: var(--clr-text--light);
	--_bg-clr: var(--presetColor);
	--_bdr-clr: var(--presetColor);
}

// outline, not filled
.button--secondary {
	--_clr: var(--presetColor);
	--_bg-clr: transparent;
	--_bdr-clr: var(--presetColor);
}
```

This is not a 100% perfect solution, but it is an efficient way to avoid repetition - we establish all styles in our _reset BLOCK_ class and then redefine styles to modifier classes.

## Astro: CSS & Frontmatter create great variables

Astro allows us to use CSS with frontmatter to create dynamic styles within our components - this becomes a powerful tool for streamlining variations of styles.

> **Example:** we need to dynamically adjust a color based on a data value. There may not be a data property that defines a style preference. We can rely on frontmatter and basic javascript.

```astro
---
interface Props {
	tier: "Free" | "Pro" | "Enterprise";
	// other props...
}

const { tier } = Astro.props;

const cssTiers = {
	free: `--clr-black`,
	pro: `--clr-blue`,
	enterprise: `--clr-yellow`,
};

const presetColor = `var(${cssTiers[tier]})`;
---

<div class="card">
	<!-- ... -->
</div>

<style define:vars={{ presetColor }}>
	.card {
		color: var(--presetColor);
	}
</style>
```

When we need to adjust css according to data, we can use JavaScript to organize and create dynamic css values. We pass variables to the `define:vars` object and then use them in our css.

This can be done with

- raw css values

```astro
---
const cssTiers = {
	free: `#000000`,
	pro: `#0000FF`,
	enterprise: `#FFFF00`,
};

const presetColor = cssTiers[tier];
---

<style define:vars={{ presetColor: }}></style>
```

- utilizing local variables

```astro
---
const cssTiers = {
	free: `--clr-black`,
	pro: `--clr-blue`,
	enterprise: `--clr-yellow`,
};

const presetColor = `var(${cssTiers[tier]})`;
---

<style define:vars={{ presetColor}}></style>
```


>**Note:** We can only pass variables using template literal strings that wrap the `var()` function around a variable name.


We can also alias variables to follow naming conventions when passing our variable into the `define:vars` object.

```astro
<style define:vars={{ "--tier-color": presetColor }}></style>
```