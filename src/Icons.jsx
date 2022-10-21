import { FaArchive, FaBook, FaMap } from 'react-icons/fa';
import { AiFillAudio } from 'react-icons/ai';
import { HiBookOpen, HiNewspaper } from 'react-icons/hi';
import { HiPhoto } from 'react-icons/hi2';
import { MdMail, MdPhotoCamera } from 'react-icons/md';
import { IoMusicalNotes } from 'react-icons/io5';
import { RiMovie2Line } from 'react-icons/ri';

export const TYPE_ICONS = {
  'ARCHIVE': <FaArchive />,
  'BOOK': <FaBook />,
  'EPHEMERA': <MdMail />,
  'GENIZA MANUSCRIPT': <HiBookOpen />,
  'KETUBBA': <HiBookOpen />,
  'MANUSCRIPT': <HiBookOpen />,
  'MAP': <FaMap />,
  'MOVIE': <RiMovie2Line />,
  'MUSIC': <IoMusicalNotes />,
  'NEWSPAPER': <HiNewspaper />,
  'ORAL': <AiFillAudio />,
  'PHOTOGRAPH': <MdPhotoCamera />,
  'PICTURE': <HiPhoto />,
  'SCORE': <IoMusicalNotes />
}