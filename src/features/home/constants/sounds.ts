export const sounds = [
	{
		key: "fuente",
		title: "Fuente",
		subtitle: "Jardín zen",
		image:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuAfsuJ_5as1OHJRcy0zaNxNMQ_NnasFsSI05w5sgjT1-okNfYHaiXdmj1FqrSkPeoMC22kHb-Juv1BB5TNtou7PczoybpUH58NB5HOVxJh0BrEw--qEFQ4Rm25U9933h4szRS_xKSLn_EKQxuLbwGnpCuE8HOyZnwqbpdpDcaMfwBRftWpSQwAom_XeFspTzyVelI4iWi_GLovE9x6c3NhbQtCOAOXLmVbMY19dQGeKtv06Sd9kVbVo7tUQPkYlQhVU4NWvu4PFg321",
		icon: "water",
		uri: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_4b44d3e2b0.mp3?filename=fountain-ambient-20377.mp3",
	},
	{
		key: "lluvia",
		title: "Lluvia",
		subtitle: "Gotas en el cristal",
		image:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuCL0WSgKXTt9egnqNX9248YAHWFBBmkQ1dfaH3hd1dXsShHnZFw276CzFDso4IcBajOdw7_j-C3u7_YiX_go5nmNTVJRFYi3PHx6h3wLClkPhUkwVkLfwP_YguEiTGcNWGE7geU0-ImADkHGoy6Vp_mMWOr0XtPZUfrFv2nn3WOYimXg5_V90qw52MXAySqlzSfqHPHgEoe2hl81faTqA5W7jNvMb2hqz5Y9c18GQF2h1JZOMPOcPkcm-pkecFYKBkGv0VE4jbLcdte",
		icon: "water",
		uri: "https://cdn.pixabay.com/download/audio/2021/11/10/audio_0c7f2264f1.mp3?filename=rain-on-window-ambient-9593.mp3",
	},
	{
		key: "rio",
		title: "Río",
		subtitle: "Corriente cristalina",
		image:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuA0Un3kxelg0MShbMf13ImFumJ0N1FIL-FVMsQksrvUoq4gAhybQ-m1gDZ1jieP0kITCJOORWHYvybQrNcHPP6F3uprwsZQtze_5pJitCe4Yj-SXkiMWUHVv5InUdXGZ0LSbIgTRMEbOp7q7apyT9uWw5P0bNbOdKdSvmCKkLT_KH30IlxygLVova2zDPXsDAXvJXfriSPykE-nIXNNpv4KLzOY0O_78nDMB09oe31AzxwBcr7dpaisqQR-tQKKWYsLa3O58ZctEcOp",
		icon: "water",
		uri: "https://cdn.pixabay.com/download/audio/2021/11/08/audio_5f3d0ac9b6.mp3?filename=river-ambience-9256.mp3",
	},
	{
		key: "cascada",
		title: "Cascada",
		subtitle: "Caída de agua profunda",
		image:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuCTtQnGvBc_8tMmWfLzx3nlmZEiaX5s2oVihj0ODFONSDLSwWBYfmxzsl7b9tRvNr3rekL17Ofp04a5pSfEUcC2mlE5jIzEC3i9plB82OBfZC-KeSsrbU1e0m52a2VX6GU2ES1U8J1AWzNfUYhEql3mrNC24MQmcVkM4Iw846PNCWGCB8xi3AXVgjtnHghxnJxunAkeWKsgUToKDNKuYU2vI8zbPttO38dtTz94SHGGSH5mlhcwwrTPXb049neFALpKknAvdCMjQmLU",
		icon: "water",
		uri: "https://cdn.pixabay.com/download/audio/2022/02/15/audio_23c5d5f6f7.mp3?filename=waterfall-ambient-18273.mp3",
	},
	{
		key: "playa",
		title: "Playa",
		subtitle: "Olas del océano",
		image:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuCZp_6Hb82QannP0YA_oU-Y3g8jtOrTImH6U3580QolvAwflAPNaRIfkt8r2uPu62wODQIarP3ssy35iJaRKc3SbQnhRTIi4MFkKbf7OM6aFWYg2daWbN1MDdShfchkpYlAOl7--1WxUhNkPx5CJueeQCc_-VgSwzdiwhDs7HoM2EvCgTtX9golw4QxBsfZSnO4KzWuyAsLYpyKTMJnIdWf4ooEOfWCJ7TgJ-NIDvUE4MQ0C6Nd7n5o7snMY5rC-U8c0eRBLYqWQ1Ef",
		icon: "water",
		uri: "https://cdn.pixabay.com/download/audio/2021/11/03/audio_4b1af1f1c0.mp3?filename=sea-waves-relaxing-8625.mp3",
	},
] as const;

export type SoundItem = (typeof sounds)[number];
