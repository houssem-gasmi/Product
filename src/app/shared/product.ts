import { Comment } from './comment';

export class Product{
	reference! : string;
	name! : string;
	stockQte! : number;
	unitPrice! : number;
	image! : string;
	category! : string;
	comments!: Comment[];
}
