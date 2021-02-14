import {LinkedList} from "./LinkedList";

export class CustomLinkedList extends LinkedList {

    public insert = (value: string, position: number): boolean => {
        --position
        if (position < 0) return false
        if (position <= this.length()) {
            super.insert(value, position)
        } else {
            let loop = this.length()
            while (++loop < position) {
                super.append("")
            }
            super.append(value)
        }
        return true
    };

    public delete(position: number): boolean {
        return super.delete(--position)
    }
}