import { FaRegIdCard, FaSitemap } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';
import { TbNetwork } from 'react-icons/tb';

import { FtthButton } from './FtthButton';

const searchButtons = [
  {
    id: 'address',
    title: 'Búsqueda por dirección',
    icon: <FiMapPin size={24} />,
    chevron: true,
    href: '/ftth/search/address'
  },
  {
    id: 'network',
    title: 'Búsqueda por elemento de red',
    icon: <TbNetwork size={24} />,
    chevron: true,
    href: '/ftth/search/network-element'
  },
  {
    id: 'dni',
    title: 'Búsqueda por DNI',
    icon: <FaRegIdCard size={24} />,
    chevron: true,
    href: '/ftth/search/dni'
  },
  {
    id: 'tree',
    title: 'Búsqueda de árbol',
    icon: <FaSitemap size={24} />,
    chevron: true,
    href: '/ftth/search/tree'
  }
];

export const FtthSearchButtons = () => {
  return (
    <div className="mx-5 flex flex-col gap-3">
      {searchButtons.map(button => (
        <FtthButton
          key={button.id}
          title={button.title}
          icon={button.icon}
          chevron={button.chevron}
          href={button.href}
        />
      ))}
    </div>
  );
};
