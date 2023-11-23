import React from "react";
import Image from 'next/image';
import NextLink from 'next/link';
import {
  Navbar, NavbarBrand, NavbarContent, 
  NavbarItem, Link, NavbarMenuToggle, 
  NavbarMenu, NavbarMenuItem } from "@nextui-org/react";

import Logo from '@/public/Pokemon.svg';
import { FavoriteIcon } from "./FavoriteIcon";


export const NavbarUI = () => {

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [ "Favoritos" ];

  return (
    <Navbar onMenuOpenChange={ setIsMenuOpen } className="bg-white border-gray-200 dark:bg-gray-900">
      <NavbarContent>
        <NavbarMenuToggle aria-label={
                            isMenuOpen 
                              ? "Close menu" : "Open menu" }
                          className="sm:hidden" />
        <NavbarBrand>
          <NextLink href='/' passHref legacyBehavior>
              <Link>
                <Image src={ Logo }
                       alt="Nav Icon"
                       width={60}
                       height={60} />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Pokemon App</span>
              </Link>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarItem>
          <NextLink href='/favorites' passHref legacyBehavior>
            <Link color="foreground" className="font-bold">
              <FavoriteIcon />
              <p className="pl-1">Favoritos</p>
            </Link>
          </NextLink>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <NextLink href='/favorites' passHref legacyBehavior>
              <Link color={ "primary" }
                    className="w-full"
                    size="lg" >
                {item}
              </Link>
            </NextLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}
