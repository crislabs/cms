import { usePathname } from 'next/navigation';
import Swal from 'sweetalert2';

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};


export function SwalMessage (title: string) {
  return Swal.fire({
    position: "center",
    icon: "success",
    title: `${title}`,
    showConfirmButton: false,
    timer: 1000,
  })
}
export function SwalMessageError (message: string) {
  return Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message,
    footer: '<a href="">Why do I have this issue?</a>',
  });
}
export function SwalMessageSiteCreateError (message: string) {
  return Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message,
    footer: '<a href="">Why do I have this issue?</a>',
  });
}

export function capitalizar(palabras: string) {
  return palabras
    .split(' ')
    .map((palabra) => palabra[0].toUpperCase() + palabra.substring(1))
    .join(' ');
}

export function slug(str: string) {
  return str
    .trim()
    .toLowerCase()
    .replace(/[\u002F]/g, '')
    .replace(/-/g, ' ')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/-/g, '')
    .replace(/:/g, '')
    .replace(/[|]/g, '')
    .replace(/\s+/g, ' ')
    .replace(/ /g, '-');
}