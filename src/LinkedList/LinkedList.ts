import {INode} from "./Interface/INode"

export class LinkedList {
    private head: INode | null = null
    private tail: INode | null = null
    private len = 0

    public length()  {
        return this.len
    }
    public append(value: string) {
        const node = this.forgeNode(value)

        if (this.isEmpty()) {
            this.head = node
            this.tail = node
            return true
        } else {
            this.appendToTheEndOfTheList(node)
        }
        this.len++
    }

    public insert(value: string, position: number): boolean {
        if(position > -1 && position <= this.len) {
            let current = this.head
            let index = 0
            let previous
            let node = this.forgeNode(value)

            if(position === 0) {
                node.next = current
                this.head = node
            } else {
                while (index++ < position) {
                    previous = current
                    // @ts-ignore
                    current = current.next
                }
                node.next = current
                if (previous != null)
                previous.next = node
            }
            this.len++
            return true
        } else {
            return false
        }
    }

    public *items() {
        let node = this.head
        while (node) {
            yield node
            node = node.next
        }
    }

    public delete(position: number): boolean {
        if (position > -1 && position <= this.len) {
            let current = this.head
            let previous
            let index = 0

            if (position === 0) {
                // @ts-ignore
                this.head = this.head.next
            } else {
                while (index++ < position) {
                    previous = current
                    // @ts-ignore
                    current = current.next
                }
                // @ts-ignore
                previous.next = current.next
            }
            this.len--

            return true
        } else {
            return false
        }
    }


    private appendToTheEndOfTheList(node: INode) {
        // @ts-ignore
        this.tail.next = node
        this.tail = node
    }

    public isEmpty = () => !this.head

    private forgeNode = (value: string): INode => {
        return { value, next: null }
    }

    public toArray = (): string[] => {
        const result: string[] = [];
        let node = this.head;
        while (node) {
            result.push(node.value);
            node = node.next;
        }
        return result;
    };

    public fromArray (values: string[]): LinkedList {
        values.forEach(v => this.append(v));
        return this;
    };
}