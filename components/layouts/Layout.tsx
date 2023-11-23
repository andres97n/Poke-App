import { FC } from "react";
import Head from "next/head";

import { NavbarUI } from '../ui';

type Props = {
  children: React.ReactNode;
  title?: string;
}


export const Layout: FC<Props> = ({ children, title = 'Pokemon App' }) => {
  return (
    <>
      <Head>
        <title>{ title }</title>
        <meta name="author" content="Andrés Novillo"></meta>
        <meta name="description" content="Prueba de Ingreso"></meta>
        <meta name="keywords" content="pokemon, api, nextjs, pokemons"></meta>
      </Head>

      <NavbarUI />

      <main>
        { children }
      </main>
    </>
  )
}
