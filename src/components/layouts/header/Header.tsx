import React from 'react';

export default function Header() {
  return (
    <header className="section relative">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <HeaderLogo />
        </div>
        <div className="">
          <HeaderNav />
          <HeaderNavMobile />
        </div>
      </div>
    </header>
  );
}

function HeaderNav() {
  return <div></div>;
}

function HeaderNavMobile() {
  return <div></div>;
}

function HeaderLogo() {
  return (
    <>
      
    </>
  );
}
