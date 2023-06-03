const urlBase =
  process.env.NODE_ENV === "development"
   // ? "http://localhost:4000/v1/"
    ? "http://192.168.1.113:4000/v1/"
    : "https://creo.red.up.railway.app/v1/";

import {
  FaceFrownIcon,
  FaceSmileIcon as FaceSmileIconMini,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";

const defaults = {
  avatar: "/assets/img/avatar.png",
  avatar_thumbnail: "/assets/img/avatar.png",
  cover: "/assets/img/cover.png",
  phone: "777 777 777",
  id: "",
  urlBase: urlBase,
  appDescription:
    'La aplicación "todo en uno" de la comunidad cristiana de habla hispana. ¡Únete a nosotros!',
  appAbout:
    "Creo.red se piensa de la necesidad de contar con una plataforma Cristocéntrica que permita compartir, crear y disfrutar de contenido de calidad,  ayudando a todos sus usuarios a crecer en su relación con Dios y a conectar con la comunidad cristiana evangélica de todo el mundo, exaltando a Jesucristo como Señor y Salvador de nuestras vidas.",
  urlFileUpload: urlBase + "upload_files",
  moods: [
    {
      name: "Excited",
      value: "excited",
      icon: FireIcon,
      iconColor: "text-white",
      bgColor: "bg-red-500",
    },
    {
      name: "Loved",
      value: "loved",
      icon: HeartIcon,
      iconColor: "text-white",
      bgColor: "bg-pink-400",
    },
    {
      name: "Happy",
      value: "happy",
      icon: FaceSmileIconMini,
      iconColor: "text-white",
      bgColor: "bg-green-400",
    },
    {
      name: "Sad",
      value: "sad",
      icon: FaceFrownIcon,
      iconColor: "text-white",
      bgColor: "bg-yellow-400",
    },
    {
      name: "Thumbsy",
      value: "thumbsy",
      icon: HandThumbUpIcon,
      iconColor: "text-white",
      bgColor: "bg-blue-500",
    },
    {
      name: "I feel nothing",
      value: null,
      icon: XMarkIcon,
      iconColor: "text-gray-400",
      bgColor: "bg-transparent",
    },
  ],
  postTypes: [
    {
      name: "Estado",
      key: "STATUS",
      current: true,
      disabled: false,
    },
    {
      name: "Noticia",
      key: "NOTICE",
      current: false,
      disabled: true,
    },
    {
      name: "Articulo",
      key: "ARTICLE",
      current: false,
      disabled: true,
    },
    {
      name: "Oración",
      key: "ORATION",
      current: false,
      disabled: true,
    },
    {
      name: "Eventos",
      key: "EVENT",
      current: false,
      disabled: true,
    },
  ],
};

export default defaults;
