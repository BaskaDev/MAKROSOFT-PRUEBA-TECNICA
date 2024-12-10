import { Album } from "./album";
import {  CollectorL } from "./collector";

export interface Comment {
    description: string;
    rating: number;
    collector: {
      id: number;
    };
  }
  
  export interface CommentL {
    id: number;
    description: string;
    rating: number;
    collector: CollectorL;
    album: Album;
  }