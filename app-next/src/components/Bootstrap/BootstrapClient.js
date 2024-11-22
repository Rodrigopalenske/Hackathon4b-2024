'use client';

import { useEffect } from 'react';

function BootstrapClient() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      require('bootstrap/dist/js/bootstrap.bundle.min.js');
    }
  }, []); // Adicione esta dependência para evitar múltiplas execuções

  return null;
}

export default BootstrapClient;


// 'use client'

// import { useEffect } from 'react'

// function BootstrapClient() {
//     useEffect(() => {
//         require('bootstrap/dist/js/bootstrap.bundle.min.js')
//     })

//     return null
// }

// export default BootstrapClient