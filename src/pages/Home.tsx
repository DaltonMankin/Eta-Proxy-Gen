import { Fragment } from 'react'

import ProxyGeneration from '../features/generation/ProxyGeneration';

export default function Home() {
  return (
    <Fragment>
      <h1>Eta Proxy Gen</h1>
      <p>Fill out the form and get a proxy.</p>
      <ProxyGeneration />
    </Fragment>
  );
}