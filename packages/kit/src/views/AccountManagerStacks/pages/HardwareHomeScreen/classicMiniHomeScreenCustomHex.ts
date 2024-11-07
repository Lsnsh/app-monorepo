import type { IHardwareHomeScreenName } from './hardwareHomeScreenData';

// Because the hex cannot be generated locally in the production environment on Android, it needs to be pre-defined.
// call printAllItemsCustomHex to print the hex in the Desktop development environment.
const classicMiniHomeScreenCustomHex: {
  name: IHardwareHomeScreenName;
  customHex: string;
}[] = [
  { 'name': 'blank', 'customHex': '' },
  {
    'name': 'original',
    'customHex':
      '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003c0000000000000000000000000000003c000000000000000000000000000003fc000000000000000000000000000003fc000000000000000000000000000003fc000000000000000000000000000003fc0000000000000000000000000000003c0000000000000000000000000000003c0000000000000000000000000000003c0000000000000000000000000000003c0000000000000000000000000000003c0000000000000000000000000000003c0000000000000000000000000000003c0000000000000000000000000000003c0000000000000000000000000000003c0000000000000000000000000000003c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ff000000000000000000000000000000ff000000000000000000000000000003ffc00000000000000000000000000003ffc0000000000000000000000000000f00f0000000000000000000000000000f00f0000000000000000000000000003c003c000000000000000000000000003c003c000000000000000000000000003c003c000000000000000000000000003c003c000000000000000000000000003c003c000000000000000000000000003c003c000000000000000000000000003c003c000000000000000000000000003c003c000000000000000000000000000f00f0000000000000000000000000000f00f00000000000000000000000000003ffc00000000000000000000000000003ffc00000000000000000000000000000ff000000000000000000000000000000ff000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  },
  {
    'name': 'bitcoin_shade',
    'customHex':
      '00000000000002aaaa00000000000000000000000000155757600000000000000000000000002aeffef80000000000000000000000015dffffff000000000000000000000003bffbfbab80000000000000000000000ffff7f75540000000000000000000001ffe800aaaa0000000000000000000003fdc00005550000000000000000000007fb000002aa800000000000000000000ffc00000055600000000000000000001ff80007002ae00000000000000000003ff00007801fd00000000000000000007fe00007882fa80000000000000000007fc41c0f1f07f4000000000000000000ff889f8f1e0bea000000000000000001ff113fff1e15fd000000000000000001fe223ffe3c2aff000000000000000003fc440fff3c157f000000000000000003f88883fffc3ebf800000000000000007fd5103fff85f7f800000000000000007faaa23fffe3fbfc00000000000000007f55547f9ff9fdfc0000000000000000feaaa87f07fcfffc0000000000000000ff55547f01fe7dfe0000000000000000feaaa8ff00fe3efe0000000000000001fc5554fe007f5f7e0000000000000001feaaa8fe087f3efe0000000000000001fd7551fc147f1d7f0000000000000001febfe9fc00ff3aff0000000000000001fd77f3ff00ff177f0000000000000001feefebfffffe2eff0000000000000001fd5ff3fffffe1d7f0000000000000001febfe7fbfffc2aff00000000000000017d7fe7f0fff0577f0000000000000000feafeff03fe0eefe0000000000000001dd5d4fe00ff1557d0000000000000000beba0fe207f02a7a00000000000000015555dfe503f854760000000000000000aeabffc283f808ee00000000000000005757ffc143fc11de0000000000000000aaa7ffc2a3fc22be00000000000000005751fff007fc457c00000000000000006ba83ffe0ff889fc00000000000000005d540ffffff801f800000000000000003baa0ffffff003f8000000000000000037d40f7ffff007f000000000000000003fea0f1fffe00fe000000000000000001ff11e3dff800fd000000000000000000ff21e3c08001ba000000000000000000ffc3c3c00001740000000000000000007fc8c7800002ac0000000000000000003ff007800005500000000000000000003ff22780000aa00000000000000000001ffd40000055400000000000000000000ffea88800aa8000000000000000000007ffd11501d50000000000000000000003fff2aa1bfa0000000000000000000000ffffd7fff400000000000000000000007fffffffe800000000000000000000001fffffffd000000000000000000000000fffffffc0000000000000000000000001ffffff000000000000000000000000007ffffc0000000000000000000000000007ffc00000000000000',
  },
  {
    'name': 'bitcoin_full',
    'customHex':
      '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007e000020000000000000000000000003ff8001e000f000000000000f00000007ffe003e001f000000000000f8000000ffff003c001f030000000000f8000001fe7f803c001f1f0000000000f0000003fe5fc03c00041e000000000040000007f01fe07c00001e000000000000000007f01fe07800001e00000000000000000ff807e07fe01e3ff03fc0fe01e0ff800ff8c3f07ff03e3ff0ffc1ff81e1ffc00ff8c3f0fff83c3fe1ffc3ff83e1ffe00ff007f0fcf83c3fe3f087cfc3c3e3e00ff007f0f07c3c3c03e00f87c3c3c1e00ff187f0f03c7c7807c00f03c3c3c1e00fe1c7f0f03c787807801e03c7c3c1e00f81c7f1e03c787807801e03c783c1e00fc007e1e07c78780f801e03c78781e007f00fe1e078f8f00f801e07c78783e007f4ffe1e078f0f00f801e07878783c003f4ffc3c0f0f0f00f801e0f8f0783c001ffff83c1f0f0f807c01f0f0f0f83c000ffff03ffe0f0ffc7fe1fff0f0f07c0007ffe03ffc1e0ffc3fe0ffe0f0f0780003ff807ff81e07fc1ff07fc1f0f07800007c000fc00001f007c01e00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  },
  {
    'name': 'ethereum',
    'customHex':
      '0000000000000000000000000000000000000000000000030000000000000000000000000000000280000000000000000000000000000007000000000000000000000000000000068000000000000000000000000000000f4000000000000000000000000000001ea000000000000000000000000000001f5000000000000000000000000000003ea000000000000000000000000000003f5000000000000000000000000000007ea80000000000000000000000000000ff540000000000000000000000000000feaa0000000000000000000000000001ff540000000000000000000000000001feaa0000000000000000000000000003ff550000000000000000000000000007feaa8000000000000000000000000007ff55400000000000000000000000000ffeaa800000000000000000000000000fff55400000000000000000000000001ffeaaa00000000000000000000000003fff55500000000000000000000000003ffeaaa80000000000000000000000007ffc55500000000000000000000000007ffa2aa8000000000000000000000000ffd40554000000000000000000000001ffaa00aa000000000000000000000001fd540055000000000000000000000003eaaa000a000000000000000000000003d5540005000000000000000000000006aaaa000080000000000000000000000d55540000000000000000000000000002aaaa0000000000000000000000000001555400000000000000000000000000002aaa0000000000000000000000000000155400000000000000000000000000040aaa00008000000000000000000000030154000100000000000000000000000380aa0002000000000000000000000001e0540015000000000000000000000000f80a002a000000000000000000000000fe0400540000000000000000000000007f0202a80000000000000000000000003fc005500000000000000000000000001ff00aa00000000000000000000000001ff855400000000000000000000000000ffeaaa000000000000000000000000007ff554000000000000000000000000007feaa8000000000000000000000000003ff550000000000000000000000000001feaa0000000000000000000000000000ff540000000000000000000000000000fea800000000000000000000000000007f5400000000000000000000000000003ea800000000000000000000000000003f5000000000000000000000000000001ea000000000000000000000000000000f4000000000000000000000000000000680000000000000000000000000000007000000000000000000000000000000028000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000',
  },
  {
    'name': 'bitcoin_b',
    'customHex':
      '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000380000000000000000000000000000003e0000000000000000000000000000003e1800000000000000000000000000007c1f00000000000000000000000000007c3e00000000000000000000000001007c3e00000000000000000000000001f07c3e00000000000000000000000003fff83c00000000000000000000000003fffc7c00000000000000000000000003fffffc00000000000000000000000001fffffc000000000000000000000000003ffffe000000000000000000000000001fffff800000000000000000000000001fffffe00000000000000000000000001ff7fff00000000000000000000000001fe07ff80000000000000000000000001fe01ffc0000000000000000000000003fe00ffe0000000000000000000000003fe007fe0000000000000000000000003fe003fe0000000000000000000000003fc003fe0000000000000000000000007fc003fe0000000000000000000000007fc003fe0000000000000000000000007fc007fe0000000000000000000000007ff00ffc000000000000000000000000fffffffc000000000000000000000000fffffff8000000000000000000000000fffffff0000000000000000000000000ffffffc0000000000000000000000001ff0fffc0000000000000000000000001ff01ffe0000000000000000000000001fe007ff0000000000000000000000001fe001ff8000000000000000000000003fe000ff8000000000000000000000003fe000ffc000000000000000000000003fc000ffc0000000000000000000000e7fc0007fc0000000000000000000001fffc000ffc0000000000000000000001fffc000ffc0000000000000000000001fffe001ffc0000000000000000000003ffffc07ff80000000000000000000000fffffffff800000000000000000000000ffffffff0000000000000000000000001fffffff0000000000000000000000001ffffffe0000000000000000000000001f3ffffc0000000000000000000000001e0ffff00000000000000000000000003e0f07800000000000000000000000003e1f00000000000000000000000000003e1f00000000000000000000000000003e1f00000000000000000000000000003c3e0000000000000000000000000000043e0000000000000000000000000000003e0000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  },
  {
    'name': 'doge',
    'customHex':
      '000000000000023c0000000000000000000000000000027c0000000000000000000000000000023a0000000000000000000000000000031a0000000000000000000000000000023e0000000000000000000000000000020d00000000000000000000000000000204800000000000000000000000000002168000000000000000000000000000020b40000000000000000000000000000405800000000000000000000000000004c8d000000000000000000000000000057f25580000000000000000000000001afbcfe200000000000000001600000075757ffd000000000000000021800001aaefaffe400000000000000041e0001d5557f7ff2000000000000000027c01ceaabffaffd000000000000000411a0e755577ff7fe8000000000000004288d8aa889befffe80000000000000041552555415fdffdf40000000000000042a286aaba15ff1bfa00000000000000401541555c45f86ff5200000000000004002808aae2a6cf6fd200000000000004010815ddd9559177e40000000000000200080abbb83ac17ff40000000000000200045455f44f217ffc010000000000020062aeafee0ff8fffe0f0000000000010050555fdfc7ffffff1c00000000000100302aaabfbbbffffff0000000000001000c55557ffdfffbffc00000000000008002aaaafeebfeffffc000000000000040013d558e1fffe07fcfc000000000004202baab20bbffc07ffa000000000000244475567c17ff003ff000000000000020a4eaac8e4bfe001fefe000000000001441dd580e0ffc001ff80000000000002a0bbaa80ecffc000ff7e0000000000037577778097ffc0007f8700000000000286eeebe06fffc0007ff8000000000003015ddddfddffe4003f8c000000000002823bbeaaabffe2003f800000000000036374ff554dfffc007fc000000000000282ebffeabffffc007fc0000000000003655fffffffffd6007fc0000000000002a27ffffffffbfe007fc0000000000002547fffffffcfd6003fc0000000000001aaffffffffcdfa087fc000000000000111ffffffffd576107fc00000000000012a7fffffffeaba00ffc0000000000000557fffffffe55c00ffc0000000000000e8ffffffffeaba01ffc0000000000000d57fffffffffc401ffc0000000000000aa3ffffffff00083ffe0000000000000d43fffffffe000d7ff60000000000000aa7ffffffff00bafff70000000000000943ffffffff0157fff78000000000000aa3ffffffffc2affff7c000000000000b45ffffffffffffffd78000000000000aa9ffffffffffefffafc000000000000150ffffffffffffffd7c000000000000aaa7fffffffffffff3fe0000000000007543fffffffffffff77f0000000000006a89fffffffffffffaff0000000000005140fffffffffffff5ff000000',
  },
  {
    'name': 'coffee',
    'customHex':
      '0000000000000000000000000000000000000000000000000001fff8000000000000000000000000001e00bfc0000000000000000000000000e00005f800000000000000000000000180002bff00000000000000000000000600005fffc00000000000000000000008000003fff000000000000000000000100000007ffc00000000000000000000300000000ffe000000000000000000002000000001ff000000000000000000002000000000ff8000000000000000000040000000003fc000000000000000000040000000000fe0000000000000000000400000000007f0000000000000000000400000000003f0000000000000000000600000000001f8000000000000000000600000000000f8000000000000000000600000000000780000000000000000007000000000007c000000000000000001f800000000003c00000000000000000e7c00000000003800000000000000001c7e0000000000380000000000000000707f0000000000380000000000000000c57f80000000003000000000000000018a3fe000000000300000000000000003053ff0000000006000000000000000062abffc000000004000000000000000045dffff8000000180000000000000000c3bbfffe000000600000000000000000865dfff5e00003000000000000000001ac0ffffe1ffff80000000000000000011437fffd000000000000000000000003281afffa00000000000000000000000350047ff400000000c000000000000002080e7ff800000003f00000000000000250077ffd00000017f8000000000000022a83bffa20000003fc0000000000000251003ff400000000f40000000000000209801fe880000000680000000000000314800ff40000000030000000000000032ac00ffa000000001000000000000003546007f40000000011000000000000010eb003e8800000001a00000000000001179c11f50010400008000000000000018bae16b8202080000800000000000000957f0160404480001000000000000000c8ff80be80aac0001000000000000000477ff54fd558f803600000000000000063bfff27bba00fffc000000000000000357ffff3f500007f00000000000000001abffff9aa00000000000000000000000d5ffffc40000000000000000000000406bffffe200000000000000000000000031fffff1d4000000000000000000080818bffff8fea808ab80000000000000040c5ffffc7fd5555f8000000000002010472ffffe1fffbbff000000000000000409d7ffff0ffffffe000000000000080000e3ffff87fffffc00000000000020852139ffff81fffff00000000000000003041e3fffc0ffffe000000000000000501907c7ffe03fff8000000000000000220000fafff01ffe00000000000000000004101fd5f807f80000',
  },
  {
    'name': 'carlos',
    'customHex':
      '000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003c0000000000000000000000000000007f80000007f000000000000000000000ffc00000fffc00000000000000000000fee00000fffc00000000000000000001fe300380fffa00000000000000000000f8180f807ff800000000000000000003ff0806f87ff000000000000000000007f88002807fd000000000000000000007ffc4000070300000000000000000000f4fe0000180000000000000000000000e0fe0000000000000000000000000001e7ff0000000000000000000000000001e7ff0000000000000000000000000001c7bf0000000000000000000000000001c09f0000000000000000000000000001d05f0000000000000000000000000001c01f1800000000000000000000000001c01e1800000000000000000000000000e01e3800000000000000000000000000cffc300000000000000000000000000047fc000000000000000000000000000007f400000000000000000000000000000fe000000000000000000000000000000fc800000000000000000000000000000fc800000000000000000000000000000781e0000000000000000000000000000007e000000000000000000000000000000fe000000000000000000000000000003fc00000000000000000000000000000ff800000000000000000000000000008ff0000000000000000000000000000107e0000000000000000000000000000003e0000000000000000000000000000007c000000000000000000000000000000fc000000000000000000000000000001f8000000000000000000000000000003f0000000000000000000000000000183f0000000000000000000000000000103f0000000000000000000000000000407f000000000000000000000000000040ee000000000000000000000000000040e00000000000000000000000000000c1c60000000000000000000000000000c39c0000000000000000000000000000e73c0000000000000000000000000000e73c0000000000000000000000000000e6780000000000000000000000000000ee780000000000000000000000000000ec780000000000000000000000000001fc780000000000000000000000000003f8700000000000000000000000000003f8700000000000000000000000000002f8700000000000000000000000000003f8700000000000000000000000000001f0200000000000000000000000000001f0000000000000000000000000000001d0000000000000000000000000000001f0000000000000000000',
  },
  {
    'name': 'einstein',
    'customHex':
      'fffe812fffffffffffffff8800000000f7d10057fffffffffffffe1000000000fee800a88bfffffffffffd4000000000fdfd0111fffffffffffffda000000000b2fa0003fffffffffffffe9000000000f5f70045ffffffffffffff4000000000eaec000027ffffffffffffe000000000ddf8015001ffffffffffff1080000000b2f20000023fffffffffff9c00000000cdfe0000017ffff7fffffdd800000000cafc0000002fffe07ffffef80000000020f20001101fffe00ffffff900000000e0e8000a0003ffc01fffffae0000000045f400040001ff0007ffffc740000000806800003880fe800fffefe1800000005578000d3cc0fd8733fffd50c000000022e800080420fa8f9bffffa0000000000475400013007501dfff7df12000000000a880100c80f8846bfffea82000000001b000000e41fd0027fffd841000000020b002000ea0fe830bfffe8010000000045007011fc0ffffc7ffffc010000000004008a02388ffcfaffffd8000000000005007880750ff70e7fffdc0010000000020001e1fa03faff3fefec00200000000000617c3f07fdf7ffd7c1000000000000002c80ea03fe3efbefca000000000000000effdc01ffe7dddff400000000000000299ff803fffdbbabb000000000000000175ff007fffff7dfd4000000000000000f7ff803fffffaaeea0000000000000015dff001fffff55fc1c60000000000001bfff203ffffe3abfb8400000000000017f7f405fffff747d6720000000000000dffe803ffffee82e80800000000000004ffd001fdfff951704000000000000002abe003fffffa22b800000000000000095fc0017eff7f67fc0000000008000002bfc000feffe89f2800000000000000005f80005f7fe51fd400000000000000003f00002b3fe09b8220000000000000051f4000039ff85d8500000000000000002e80000fbfc0eea800000000000000103d44001fdfc0dd34000000000000000029a0003fefe0a77800000000000000101400015ff7c0775000000000060000000aaa046afee8cd98000000000800000015545d53fd780e08000000000a000000020008097fe02248000000000400000004001695ff804000000000000c00000000081820ffc00000000000000c00000040000140ff8000000000000008000000000000029f8000000000000008000000000000007f4000000000000000000000000000001f000000000000000000000000000000170000000000000000000000000000022b0000000000000000000000000000051600000000000000000000000000002b8a0000000000000000000000000000551400000000000000000000000000002ba40000000000000000000000000057ff4000000000000000000000000000fffece00000000000000000000000001ffff9fc00000000000000',
  },
  {
    'name': 'anonymous',
    'customHex':
      '000000001f0000fffc0003e000000000000000001e30007ff80071e000000000000000001cf0003ff0007ce0000000000000000019fe001fe001fee000000000000000003bff801fc08fffe000000000000000003fffe01fc01fffe000000000000000003ffff11fe03fffe000000000000000003ffff83ff87fffe000000000000000003ffffc3ff0ffffe000000000000000003ffffe3fe1fffff000000000000000003ff07e1fe3f03ff000000000000000003fc01f0fe7c00ff000000000000000003f00070fff8003f000000000000000003e00010ffc0003f000000000000000003800000ffc0000f000000000000000003000000ffc00000000000000000000003800010ffe0007c0000000000000000038007f07fffffff0000000000000000033ffff0ffffffff000000000000000003fffff0ffffffff000000000000000003fffff0ffffffff000000000000000003fffff0ffffffff000000000000000001ffffe0ffffffff000000000000000000fffff0fffffffe000000000000000000fffff0fffffffe0000000000000000007fffe0fffffffe0000000000000000007fffe0fffffffc0000000000000000003fffc0fffffff80000000000000000011fff80ff3ffff000000000000000000187e100ff1fffe0000000000000000000800200ffce000800000000000000000081fe10ffef0008000000000000000000c8fe31ffeff80800000000000000000048ff31fffff888000000000000000000643fa1fffff090000000000000000000241ff1ffffe110000000000000000000320ff9fdffc1200000000000000000001803f8f8ff822000000000000000000019006000fe06600000000000000000000c800000380c400000000000000000000e4000200018c000000000000000000006300070003180000000000000000000031800f8006180000000000000000000038f00f801c3000000000000000000000187fe001fe60000000000000000000001c3ff83ffe60000000000000000000000c07fffffcc0000000000000000000000e03fffff9c00000000000000000000006183ffff98000000000000000000000031f001ff30000000000000000000000031fe01fe60000000000000000000000019fe03fe60000000000000000000000019ff03fcc000000000000000000000000cff07fdc0000000000000000000000004fe07ff80000000000000000000000007fe03ff00000000000000000000000003fc03ff00000000000000000000000001fc01fe00000000000000000000000000fc01fc000000000000000000000000007c03f8000000000000000000000000007e03f8000000000000000000000000003e03f0000000000000000000000000003e07e0000000000000000000000000001e07c00000000000000',
  },
  {
    'name': 'piggy',
    'customHex':
      '000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000c001fffe000000000000000000000003e00fffffc00000000000000000000007f03ffffff0000000000000000000000630fffffffc000000000000000000003631ffffffff000000000000000000001ff3ffffffff801000000000000000001fe7fffe7fffc0180000000000000000078fffc66fffc0780000000000000000019fffe0cfff83f8000000000000000001fffff00fff8ff0000000000000000000fffff00fff3ff00000000000000000007fffe187ff3ff00000000000000000007fffe1c3ff7fe00000000000000000007fffe3e3ffffc00000000000000000007fffc3c3fffe000000000000000000007fff8003fffc000000000000000000007fff8407fffe000000000000000000007fff8f0fffff000000000000000000007ffc0f8fffff000000000000000000007ff81f87fff3000000000000000000007fff0707fff3800000000000000000007fff000ffff3f00000000000000000007fff200ffffff80000000000000000007ffe661ffffff80000000000000000007fffe7fffffff00000000000000000003fffeffffffff00000000000000000003ffffffffffff00000000000000000003fffffffffffe00000000000000000003fffffffffff800000000000000000003ffffffffffc000000000000000000003fe3ffffff80000000000000000000001fe00fffe000000000000000000000001fcc0007e000000000000000000000001fc7c007e7c0000000000000000000001f87e003e3c0000000000000000000000f87c003e3c0000000000000000000000f83e001e3c0000000000000000000000781e001e1c0000000000000000000000700e000e1c00000000000000000000003006000e0c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000384327c0021938007c2113e0078f800040e3e600061914007c613300030a8000c0b3e600061d16001061e200030200008192a700071d12001071838003020000811227000d15120010d1838003020000c1b226000f13160010f1c2000302000040a22600099314001099320003020000786227c008933c00108913e00fc20000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  },
  {
    'name': 'nyancat',
    'customHex':
      '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000030000000000000000000000000000000cc000000000000000000000000000000cc0000000000000000000000000000003000000000000000000000000000000030000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ffffffffe00000000000000000000000fffffffff00000000000000000000003ff9ffffff80000000000000000000003f19bfffff80000000000000000000003f833fffff80000000000000000000003fc03fffff80000000000000000000003fc03fffff80000000000000000000003f861fffff80000000000000000000003f870f8fff80000000000000000000003f8f8f87ff80000000000000000000003f0f0e71ff83800000000000000000003e000e79ff83c00000003fffe000000f3e101e7e7f8fc00000083fffe000000f3e3c3e7e7f8fc000000ffffffffff007303e3e7f001fc000000ffffffe1ff3c3207e1e7f807fc000000ffffffe1fe1e03c1c3e7fb7ffc000000f07fffe4fe0f03c003e7fffffc000000f87fffc4ff0703c803cffffffc000000f33fffc8ff83c399861fffffff000000f33fff9cffc3c3f9ff1ff7ffdf000000e47f0780ffe0f3fbff9fe7ffcf000000c67f87e3fff0e3ffff9fe7ff8f000000e07f33fff87803ffff9f87e20f000000f0ff33fff87c03ffff9f87e20f000000fffe47fffb3f83ffff9fffffff000000fffc67fff13fc3ffff9fffffff000000fffe07fff67ff3ffff9fe78e3f000000ffff0fffc67ff3ffff9fe78e3f000000ffffffffe07ff3ffffe7e0003c000000fffffffff8ffe3ffffe7e00038000000ff134bffffce00fffff9ffffe0000000fc0001ffff0000fffff9ffffe00000000000000000003f0000000000000000000000000000003f0000000000000000000000000000003c010000000c000000000000000000003c01c000780e000000000000600600000000000000000000000000006006000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000018000000000000000000000000000000180000000000000000000000000000001800000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  },
  {
    'name': 'dogs',
    'customHex':
      '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003c0000000000000000000000000000003c0000000000000000000000ff00000fff0000000000000000000000ff00000fff0000000000000000000000ffc000ffff0000000000000000000000ffc000ffff0000000000000000000000ffffffcfff0000000000000000000000ffffffcfff00000000000000000000003fffffcffc00000000000000000000003fffffcffc00000000000000000000000ffffffff000000000000000000000000ffffffff0000000000000000000000003ffffff00000000000000000000000003ffffff00000000000000000000000003ffffff00000000000000000000000003ffffff00000000000000000000000003c3fc3c00000000000000000000000003c3fc3c00000000000000000000000003c3f00c00000000000000000000000003c3f00c00000000000000000000000000c3f03c00000000000000000000000000c3f03c00000000000000000000000000fffc3c00000000000000000000000000fffc3c00000000000000000000000000fffffc00000000000000000000000000fffffc00000000000000000000000000fffff000000000000000000000000000fffff000000000000000000000000000fffff000000000000000000000000000fffff000000000000000000000000000fffff000000000000000000000000000fffff000000000000000000000000000fc0ff000000000000000000000000000fc0ff000000000000000000000000000f003c000000000000000000000000000f003c0000000000000000000000000003003c0000000000000000000000000003003c000000000000000000000000000300f0000000000000000000000000000300f00000000000000000000000000000c3c00000000000000000000000000000c3c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  },
  {
    'name': 'tetris',
    'customHex':
      '000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000fdfbf000000000000000000000000000fdfbf000000000000000000000000000fdfbf000000000000000000000000000fdfbf000000000000000000000000000fdfbf000000000000000000000000000fdfbf0000000000000000000000000000000000000000000000000000000000001f8000000000000000000000000000001f8000000000000000000000000000001f8000000000000000000000000000001f8000000000000000000000000000001f8000000000000000000000000000001f800000000000000000000000000000000000000007e0000000000000000000000000000007e0000000000000000000000000000007e0000000000000000000000000000007e0000000000000000000000000000007e0000000000000000000000000000007e0000000000000000000000000000000000000000000000000000000000003f7e000001fbf00000000000000000003f7e000001fbf00000000000000000003f7e000001fbf00000000000000000003f7e000001fbf00000000000000000003f7e000001fbf00000000000000000003f7e000001fbf000000000000000000000000000000000000000000000000000007e000001fbf0000000000000000000007e000001fbf0000000000000000000007e000001fbf0000000000000000000007e000001fbf0000000000000000000007e000001fbf0000000000000000000007e000001fbf0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007efc0007e00000000003f00fdfbf00007efc0007e00000000003f00fdfbf00007efc0007e00000000003f00fdfbf00007efc0007e00000000003f00fdfbf00007efc0007e00000000003f00fdfbf00007efc0007e00000000003f00fdfbf0000000000000000000000000000000000007efdfbf7efdfbf7efc03f7efdfbf7e007efdfbf7efdfbf7efc03f7efdfbf7e007efdfbf7efdfbf7efc03f7efdfbf7e007efdfbf7efdfbf7efc03f7efdfbf7e007efdfbf7efdfbf7efc03f7efdfbf7e007efdfbf7efdfbf7efc03f7efdfbf7e00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  },
  {
    'name': 'pacman',
    'customHex':
      '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003fc000000000000000000000000000007fe00000000000000000000000000000f9f80000000000000000000000000001f8f80000000000000000000000000001f9f00000000000000000000000000003ffc00000000000000000000000000003ff800070000c00030000c00018000003fe000078001e00078001e0003c000003fe000078001e00078001f0003c000003ff800070001e00078000e00038000003ffe00020000800000000400010000001fff00000000000000000000000000001fff80000000000000000000000000000fff000000000000000000000000000007fe000000000000000000000000000001fc00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  },
  {
    'name': 'tothemoon',
    'customHex':
      '000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000fe000000000000000072000000000003ff800000000000000019000000000007ffc0000000000000001e80000000000fffe0000000000000001f02c00000000fffe0000000000000000789000000001ffff0000000000000000704800000001ffff000000000000001e389fc0000001ffff0000000000000013f87d00000001ffff00000000000000003d7280000001ffff000000000000007fc7c000000001ffff00000000000000fff38000000001fffe0000000000000195500000000000fffe0000000000000100023f00000000fffe0000000000000001d0bfc00000007ffc0000000000000007a9ffe00000003ff8000000000000000ff23bb00000000fe0000000000000001de413b80000000000000000000000001bd2189800000000000000000000000033c508080000000000000000000000003743800000000000000000000000000006028400000000000000000000000000060ac000000000000000000000000000060180000000000000000000000000000608c0000000000000000000000000000000c00000000000000000000000000000080000000000000000000000000000000800000000000000000000000000000008000000000000000000000000000000080000000000000000000000000000000800000000000000000000000000000008000000000000000000000000000000080000000000000000000000000000000800000000007e01f0003200000000000800000000000800440066000000000008000000000008004400ac00000000000800000000001b008e60b98cf000000008000000000034819c816954a800000008000000000064831542da55a8000000080000000000430216e29199280000000c00000000000000000400000000000008000000000000000000000000000000080000000000000000000000000000000800100000000000000000000000000008001b00000000000000000000000000080030000000000000000000000000000c009000039c0b723ffffffffffffffffc00000000007ffc0100081ffffffffffcefbeb80000eff87d0000909ffffffffc00000000023e3c03e40000001ffff3f028000000007ffc00000003cffffffe0000030000001ff0062000000013402000000000007cffffc001a8010020000120000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  },
  {
    'name': 'xrc',
    'customHex':
      '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000fc000000000000000000000000000003ff00000000000000000000000000000fff80000000000000000000000000001fff80000000000000000000000000007f8fc038000000000000000000000000fe07c0fe000000000000000000000001fc03c3ff800000000000000000000001f803cfffc00000000000000000000003f003ff83c00000000000000000000003e007fe01e00000000000000000000007c007fc00f0000000000000000000000f800ff800f0000000000000000000000f801ff080e0000000000000000000000f001ff3c3e0000000000000000000001f003fffffe0000000000000000000001f043fffffc0000000000000000000007f0e7fffff8000000000000000000000ff1fffffff0000000000000000000003fffffffffe0000000000000000000007fffffffffe000000000000000000000fffffffffff000000000000000000001fffffffffff800000000000000000001fffffffffffc00000000000000000003f83fffe0fffe00000000000000000003f00fffc03fff00000000000000000007e007ff801fff00000000000000000007c703ff180fff8000000000000000000fcf83ff3e0fff8000000000000000000f9cc1fe6307ffc000000000000000000f9861fec107ffc000000000000000001f9861fec107ffc000000000000000001f98c1fe6307ffc000000000000000001f8fc3fe7e0fffe000000000000000001fc783073c0fffe000000000000000001fe00603001fffe000000000000000001ff00e03803fffe000000000000000001ff81f03e0ffffe000000000000000001fe7ff87ff3fffe000000000000000000fc0ffcffc1fffe000000000000000000fcc3ffff18fffc000000000000000000fcf87fc07cfffc0000000000000000007e78000439fff80000000000000000007f223c7c91fff80000000000000000003f0e793dc3fff00000000000000000001fff3399fffff00000000000000000001fff87c3ffffe00000000000000000000fffffffffffc000000000000000000007ffffffffff8000000000000000000001ffffffffff0000000000000000000000fffffffffc00000000000000000000003ffffffff0000000000000000000000007ffffff800000000000000000000000003ffff80000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  },
];

export default classicMiniHomeScreenCustomHex;
