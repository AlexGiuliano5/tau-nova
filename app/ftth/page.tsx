import { FtthSearchButtons } from '@/components';

export default function FTTHPage() {
  return (
    <>
      <div className="py-7 mx-5 w-auto rounded-2xl flex flex-col items-center">
        <span>Te damos la bienvenida</span>
        <p className="font-semibold">¿Qué búsqueda querés hacer hoy?</p>
      </div>
      <FtthSearchButtons />
    </>
  );
}
