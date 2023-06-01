import EventEmitter from "events";

const emiter = new EventEmitter();

export const useEmitter = () => emiter;