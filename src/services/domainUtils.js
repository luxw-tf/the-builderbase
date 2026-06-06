export const getNavigationUrls = () => {
  const { hostname, port, protocol } = window.location;
  const isLocal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.localhost');
  
  let mainUrl = '';
  let daoUrl = '';
  
  if (isLocal) {
    const portSuffix = port ? `:${port}` : '';
    if (hostname.startsWith('dao.')) {
      daoUrl = `${protocol}//${hostname}${portSuffix}`;
      const mainHost = hostname.replace(/^dao\./, '');
      mainUrl = `${protocol}//${mainHost}${portSuffix}`;
    } else {
      mainUrl = `${protocol}//${hostname}${portSuffix}`;
      daoUrl = `${protocol}//dao.${hostname}${portSuffix}`;
    }
  } else {
    // Production
    mainUrl = 'https://builderbase.xyz';
    daoUrl = 'https://dao.builderbase.xyz';
  }
  
  return { mainUrl, daoUrl };
};

export const isDaoSubdomain = () => {
  const hostname = window.location.hostname;
  const searchParams = new URLSearchParams(window.location.search);
  return hostname.startsWith('dao.') || 
         searchParams.get('subdomain') === 'dao' || 
         searchParams.get('dao') === 'true';
};
