export interface Paper {
	id: string;
	title: string;
	authors: string[];
	arxivId: string;
	abstract: string;
	order: number;
}

export interface Week {
	slug: string;
	number: number;
	title: string;
	description: string;
	publishedAt: string;
	papers: Paper[];
}

/** Minimal paper reference used by the progress store. */
export interface PaperRef {
	id: string;
	order: number;
}

/** Minimal week reference used by the progress store. */
export interface WeekRef {
	slug: string;
	papers: PaperRef[];
}
