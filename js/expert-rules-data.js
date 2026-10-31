// === 고수 노하우 규칙 데이터베이스 (자동 생성 파일 — scripts/build-expert-rules.js) ===
// 원문 근거: data/lure-knowledge/*.json (71개 레코드, 65개 권위 출처 URL)
// 생성 시각: 2026-10-31T13:20:32.376Z

const EXPERT_RULES = [
  {
    "id": "r01_muddy_cover_flip_jig",
    "title": "탁수 헤비커버 벌키 플리핑 지그",
    "lureId": "rubber_jig",
    "when": {
      "clarity": [
        "muddy"
      ],
      "struct": [
        "heavy_cover",
        "shallow_weed"
      ]
    },
    "effect": {
      "score": 11
    },
    "advice": {
      "colors": [
        "블랙 & 블루 (Black/Blue)",
        "헤마토마 (Hematoma)"
      ],
      "weight": "1/2 ~ 5/8 oz (14.2~17.7g) 헤비 커버 지그",
      "trailer": "물을 강하게 밀어내는 벌키 비버/청크/토드 트레일러 (Sweet Beaver, Rage Craw, Tour Toad)",
      "action": "부유물 매트나 잠긴 수몰나무·관목 중심부로 정밀 피칭해 표면층을 뚫고 수직 폴링시킨 뒤 바닥에서 짧게 호핑"
    },
    "reason": "시야가 30cm 이하로 막힌 탁수에서는 배스가 1~5ft 얕은 커버나 수면적이 줄어들어 밀집된 잔여 수몰나무에 바짝 붙어 측선(진동)과 흑청색 대비 실루엣으로 먹이를 찾습니다. 부유물과 나뭇가지를 단번에 관통하려면 1/2oz 이상 무게와 킥이 강한 벌키 트레일러가 필수입니다.",
    "sources": [
      {
        "authority": "Bassmaster Elite · Cliff Pirch",
        "url": "https://www.bassmaster.com/how-to/slideshow/elites-top-muddy-water-baits/",
        "quote": "A black-and-blue 1/2-ounce flipping jig with a Big Bite Baits Tour Toad trailer. 'The 1/2-ounce weight is ideal for penetrating the surface of the debris.'"
      },
      {
        "authority": "Bassmaster · Kevin VanDam",
        "url": "https://www.bassmaster.com/news/dealing-with-high-muddy-water/",
        "quote": "If there is too much debris to fish a spinnerbait, I will go to 1/2-ounce Strike King Hack Attack Flipping Jig in black/blue with a Rage Craw and flip it into thick cover."
      },
      {
        "authority": "TacticalBassin · Tim Little",
        "url": "https://www.tacticalbassin.com/blog/muddy-water-baits",
        "quote": "Dirty Jigs Flippin' Jig (5/8 oz) Colors: Hematoma, Black/Blue + Sweet Beaver / Paca Chunk Sr."
      }
    ],
    "sourceCount": 3
  },
  {
    "id": "r02_muddy_shallow_spinnerbait",
    "title": "탁수 콜로라도/페인티드 스피너베이트 슬로우 롤링",
    "lureId": "spinnerbait",
    "when": {
      "clarity": [
        "muddy"
      ],
      "tempRange": [
        11,
        30
      ]
    },
    "effect": {
      "score": 12
    },
    "advice": {
      "colors": [
        "차트루즈 & 화이트 (Chartreuse/White)",
        "파이어타이거",
        "화이트 페인티드 블레이드 / 레드 키커 블레이드"
      ],
      "weight": "1/2 oz (14.2g) — 콜로라도 또는 탠덤(콜로라도+윌로우) 블레이드",
      "trailer": "4인치 섀드웜 또는 스플릿테일 트레일러",
      "action": "수심 0.3~1.5m 극섈로우 잠긴 육초·관목·수몰나무 외곽을 스치듯 천천히 감아(슬로우 롤링) 블레이드의 강한 파동(thump)과 부력(lift)으로 스트라이크존 체류 시간 극대화"
    },
    "reason": "안정되거나 수위가 오르는 탁수에서 배스는 5ft(1.5m) 이내 얕은 곳으로 몰립니다. 둥근 콜로라도 블레이드는 강한 수류 저항으로 흙탕물 속 배스의 측선을 강타하며, 부력이 커서 느리게 감아도 밑걸림 없이 스트라이크존에 오래 머뭅니다.",
    "sources": [
      {
        "authority": "Bassmaster · Kevin VanDam",
        "url": "https://www.bassmaster.com/news/dealing-with-high-muddy-water/",
        "quote": "This is when I want a bulky spinnerbait with Colorado blades. Those blades not only put out a lot of vibration to help the fish find the bait in muddy water, but they provide lift and require you to wind the bait slower."
      },
      {
        "authority": "Bassmaster · Rick Clunn",
        "url": "https://www.bassmaster.com/news/i-like-muddy-water/",
        "quote": "In muddy water, you will find the fish in 5 feet or less... they are using their lateral lines. You have to use a lure that displaces water, such as a flat crankbait or spinnerbait."
      },
      {
        "authority": "Bassmaster Elite · Brandon Card",
        "url": "https://www.bassmaster.com/how-to/slideshow/elites-top-muddy-water-baits/",
        "quote": "1/2-ounce Spinnerbait with tandem Willowleaf and Colorado blades... The flash and the red kicker blade stands out, and the double blades move a lot of water."
      },
      {
        "authority": "TacticalBassin · Tim Little",
        "url": "https://www.tacticalbassin.com/blog/muddy-water-baits",
        "quote": "Painted Blade Spinnerbaits (1/2 oz) Colors: ColeSlaw, White/Chartreuse."
      },
      {
        "authority": "Wired2Fish · Shaye Baker",
        "url": "https://www.wired2fish.com/fishing-tips/choosing-the-right-bladed-bait-for-muddy-water",
        "quote": "A spinnerbait creates much more distinct pulses in the water... the spinnerbait comes through wood far better than any other moving bait... Cold and muddiest: 3/8-ounce spinnerbait with a large #5 Colorado blade on the back and a smaller #3 Colorado blade in the front."
      }
    ],
    "sourceCount": 5
  },
  {
    "id": "r03_muddy_chatterbait",
    "title": "탁수 강진동 블레이드 지그 (채터베이트)",
    "lureId": "chatterbait",
    "when": {
      "clarity": [
        "muddy"
      ],
      "struct": [
        "shallow_weed",
        "rock_slope",
        "heavy_cover"
      ]
    },
    "effect": {
      "score": 9
    },
    "advice": {
      "colors": [
        "파이어 크로우 (Fire Craw - 형광 오렌지/레드)",
        "차트루즈 & 화이트",
        "블랙 & 블루"
      ],
      "weight": "1/2 oz (14.2g)",
      "trailer": "펄 화이트 또는 차트루즈 섀드/핀테일 트레일러 (꼬리 오렌지 디핑 추천)",
      "action": "일정한 속도로 감아 육각 블레이드의 강한 진동과 금속성 클릭음을 유지하며, 수초 줄기에 걸리면 강하게 낚아채(rip) 뜯어내며 리액션 유도 (잔교·오버행 아래로는 스키핑 진입)"
    },
    "reason": "채터베이트는 크랭크베이트의 강력한 진동과 러버지그의 장애물 돌파력을 동시에 갖춰, 시야가 차단된 탁수 수초·잔교 주변에서 배스의 시각(형광·강한 대비 컬러)과 청각·측선을 동시에 자극합니다.",
    "sources": [
      {
        "authority": "Bassmaster Elite · Bill Weidler",
        "url": "https://www.bassmaster.com/how-to/slideshow/elites-top-muddy-water-baits/",
        "quote": "A Z-Man Evergreen Chatterbait Jackhammer, in the red-hot Fire Craw pattern... The bass can see the brighter color bait in muddy water, plus it produces that bladed jig vibration."
      },
      {
        "authority": "TacticalBassin · Tim Little",
        "url": "https://www.tacticalbassin.com/blog/muddy-water-baits",
        "quote": "Evergreen JackHammer Chatterbait (1/2 oz) Colors: Chartreuse/White, White, Fire Craw."
      },
      {
        "authority": "Wired2Fish · Shaye Baker",
        "url": "https://www.wired2fish.com/fishing-tips/choosing-the-right-bladed-bait-for-muddy-water",
        "quote": "If we’re talking grass, especially submerged grass like hydrilla or milfoil, then I’m going with a ChatterBait 10 times out of 10... You can skip a ChatterBait under docks and overhangs like a regular jig."
      }
    ],
    "sourceCount": 3
  },
  {
    "id": "r04_muddy_shallow_crank",
    "title": "탁수 섈로우 스퀘어빌·플랫 크랭크 디플렉션",
    "lureId": "shallow_crank",
    "when": {
      "clarity": [
        "muddy",
        "stained"
      ],
      "struct": [
        "rock_slope",
        "heavy_cover",
        "shallow_weed"
      ],
      "tempRange": [
        10,
        28
      ]
    },
    "effect": {
      "score": 8
    },
    "advice": {
      "colors": [
        "차트루즈 블랙 백 (Chartreuse Black Back)",
        "파이어타이거 / 핫 머스타드",
        "레드 크로우 / 델타 크로우"
      ],
      "weight": "7~14g (3인치 급 벌키 스퀘어빌 또는 물 저항이 큰 플랫 사이드 크랭크)",
      "trailer": "숏섕크 와이드갭 트레블 훅 (#4) 업그레이드 권장",
      "action": "수몰나무 통나무·그루터기·석축 바닥에 립을 일부러 강하게 부딪혀 옆으로 튕겨나가는(deflection) 순간의 반사 입질 유도"
    },
    "reason": "탁수나 가을 크릭에서 배스는 나무·바위 커버에 바짝 붙어 있습니다. 물을 강하게 밀어내는 스퀘어빌이나 플랫 크랭크로 장애물을 직접 때려 궤도를 깨뜨리면, 먹이 사냥 의지가 없던 배스도 본능적으로 덮칩니다.",
    "sources": [
      {
        "authority": "Bassmaster Elite · Edwin Evers",
        "url": "https://www.bassmaster.com/how-to/news/crankbait-or-spinnerbait-in-the-fall/",
        "quote": "During fall in Oklahoma, I'm usually targeting shallow water in the backs of pockets and creeks with stained or dirty water. A square-billed crankbait... I can burn the bait down a log, and it will hit the wood and deflect off to the side and trigger a bite."
      },
      {
        "authority": "Bassmaster · Kevin VanDam",
        "url": "https://www.bassmaster.com/news/dealing-with-high-muddy-water/",
        "quote": "I like to throw a KVD 1.5 Flat crankbait that displaces a lot of water... It’s important to fish this lure close to the bottom or near objects because that’s where the fish will be holding."
      },
      {
        "authority": "TacticalBassin · Matt Allen",
        "url": "https://www.tacticalbassin.com/blog/how-to-catch-bass-in-muddy-water-spinnerbait-crankbait-and-jig-fishing-tips",
        "quote": "Ultra-Shallow Squarebills... Colors: Chartreuse Black Back, Citrus Nasty, Firetiger Crystal, Delta Craw."
      },
      {
        "authority": "Wired2Fish · Shaye Baker",
        "url": "https://www.wired2fish.com/tackle-tips/does-crankbait-color-really-matter-in-muddy-water",
        "quote": "The bass use their lateral lines to track down moving baits... making repeated deflections off the rocky bank and alerting those finely tuned lateral lines on the fish."
      }
    ],
    "sourceCount": 4
  },
  {
    "id": "r05_drawdown_stained_lipless",
    "title": "배수기·턴오버 탁수 물골 바이브레이션 리액션",
    "lureId": "lipless_vib",
    "when": {
      "waterTrend": [
        "falling"
      ],
      "clarity": [
        "stained",
        "muddy"
      ],
      "struct": [
        "rock_slope",
        "deep_open",
        "shallow_weed"
      ]
    },
    "effect": {
      "score": 9
    },
    "advice": {
      "colors": [
        "차트루즈 섀드 (Chartreuse Shad)",
        "레드 크로우 / 스프링 크로우",
        "크롬 블루 백"
      ],
      "weight": "1/2 ~ 5/8 oz (14~18g) 래틀 내장 립리스 바이브레이션",
      "trailer": "밑걸림 다발 구간에서는 전면 트레블 훅을 한 치수 키우거나 더블훅 튜닝",
      "action": "물이 빠져 드러난 물골(메인 채널) 끝자락이나 수몰나무·돌에 일부러 살짝 걸렸다 빠져나오게(자연스러운 리액션) 운용하거나, 로드 끝이 떨릴 정도의 정속으로 중하층 리트리브"
    },
    "reason": "배수기나 가을 턴오버로 뻘물이 발생하면 배스는 물골(채널)이나 남은 수몰나무에 모여 예민해집니다. 이때 움직임이 적은 웜보다 강한 진동+래틀음을 내는 바이브레이션으로 장애물을 치고 나오는 리액션이 훨씬 높은 조과를 냅니다.",
    "sources": [
      {
        "authority": "낚시춘추 · 이동환 프로",
        "url": "https://m.fishingseasons.co.kr/news_Detail.asp?b_no=13678",
        "quote": "내림수위... 물색이 탁할 때 웜 채비보다는 하드베이트를 택한다... 오픈워터에서는 바이브레이션이나 크랭크베이트의 ‘진동+래틀+리액션’을 이용해 공략한다. 메인채널이 드러날 때쯤 되면 바이브레이션으로 많은 배스를 낚았다."
      },
      {
        "authority": "Outdoor Life · Fall Turnover Guide",
        "url": "https://www.outdoorlife.com/fishing/fall-turn-over-bass/",
        "quote": "Bass rely more on 'hearing' than 'seeing' when their visibility is limited by murky water. Here, use lipless crankbaits that wiggle so sharply they make your rod tip quiver."
      },
      {
        "authority": "TacticalBassin · Tim Little",
        "url": "https://www.tacticalbassin.com/blog/muddy-water-baits",
        "quote": "LIPLESS: Lucky Craft LV-500 Colors: Chartreuse Shad, Spring Craw, TO Craw / Damiki Tremor: Red Craw."
      }
    ],
    "sourceCount": 3
  },
  {
    "id": "r06_drawdown_suspended_downshot",
    "title": "배수기 직벽·오픈워터 서스펜드 다운샷",
    "lureId": "downshot_rig",
    "when": {
      "waterTrend": [
        "falling"
      ],
      "clarity": [
        "clear",
        "stained"
      ],
      "struct": [
        "rock_slope",
        "deep_open"
      ]
    },
    "effect": {
      "score": 9
    },
    "advice": {
      "colors": [
        "일렉트릭 섀드 (Electric Shad)",
        "와카사기 / 내추럴 섀드",
        "그린펌킨"
      ],
      "weight": "1/16 ~ 3/16 oz (1.8~5.3g) 텅스텐 티어드롭 싱커 + 단차 30cm (가을 베이트피시 기준)",
      "trailer": "4인치 세장형 섀드/스트레이트 웜 (Keitech Easy Shiner 4\", 4인치 스트레이트웜) + #1~#2 세단 훅",
      "action": "수위가 빠지며 연안을 떠나 직벽·오픈워터 중하층에 뜬(서스펜드) 개체를 노려 단차를 30cm로 길게 주고, 인위적인 흔들기보다 10초 이상 가만히 멈춰두는 '스테이(Stay)' 위주로 운용"
    },
    "reason": "배수가 진행되면 배스는 연안에서 물러나 급심 직벽이나 오픈워터에 서스펜드합니다. 단차를 30cm로 길게 준 다운샷으로 유영 수심을 맞추고 의도적인 액션을 줄여 스테이하면 잔챙이를 거르고 경계심 높은 빅배스를 낚을 수 있습니다.",
    "sources": [
      {
        "authority": "TacticalBassin · Matt Allen & Tim",
        "url": "https://www.tacticalbassin.com/blog/how-to-catch-suspended-bass-fishing-during-the-fall-draw-down",
        "quote": "As water levels fall, bass back away from the shore and suspend in open water... Dropshot: Keitech Easy Shiner 4\" (Electric Shad), Owner Mosquito Light (Size 1), Swagger Tungsten 3/16 Tear Drop."
      },
      {
        "authority": "낚시춘추 · 유해일 KSA 프로",
        "url": "https://m.fishingseasons.co.kr/news_Detail.asp?b_no=13782",
        "quote": "다운샷리그: 어군탐지기에 낱마리 배스가 찍힐 때 꼼꼼하게 공략하기 위해 사용한다. 웜과 봉돌의 단차는 30cm 정도로 길게 운용한다. 가을엔 먹잇감이 작아 4인치를 주로 쓰고 있다."
      },
      {
        "authority": "낚시춘추 · 강시원 KSA 프로",
        "url": "https://m.fishingseasons.co.kr/news_Detail.asp?b_no=2298",
        "quote": "직벽 구간을 노릴 때 가장 위력을 발휘하곤 하는데... 가장 확실한 테크닉은 그냥 놓아두고 기다리는 것, 즉 ‘스테이(stay)’였다."
      }
    ],
    "sourceCount": 3
  },
  {
    "id": "r07_drawdown_shad_swimbait",
    "title": "배수기 직벽·브레이크라인 5인치 섀드웜 스위밍",
    "lureId": "swimbait_shad",
    "when": {
      "waterTrend": [
        "falling"
      ],
      "struct": [
        "rock_slope",
        "deep_open"
      ]
    },
    "effect": {
      "score": 10
    },
    "advice": {
      "colors": [
        "기자드 섀드 (Gizzard Shad)",
        "아이스 섀드 / 펄 화이트"
      ],
      "weight": "웨이티드 훅 또는 지그헤드 (1/16 ~ 1/4 oz) + 10~12lb 플루오로카본 (폴링 속도 감속용) + 언더 블레이드 튜닝",
      "trailer": "4.8 ~ 5인치 볼륨 섀드웜 (Berkley Hollow Belly 5\", Keitech Fat Swing Impact 4.8\")",
      "action": "직벽과 평행하게 원투하거나 1차 브레이크라인·물골로 던져 10~20초 카운트다운으로 배스 유영층까지 내린 뒤, 꼬리가 간신히 흔들릴 정도의 슬로우 릴링으로 바닥 장애물에 부딪혀 밸런스를 깨뜨림 (반응 없으면 90° 리프트앤폴)"
    },
    "reason": "배수기에는 배스가 1차 브레이크라인과 물골, 직벽 중층으로 후퇴해 먹이 사냥을 꺼립니다. 비거리가 길고 파장이 큰 5인치 섀드웜(필요 시 블레이드 튜닝)으로 은신처 바닥 돌에 부딪혀 밸런스를 깨뜨리면 강한 리액션 바이트가 일어납니다.",
    "sources": [
      {
        "authority": "Bassmaster · Stephen Headrick",
        "url": "https://www.bassmaster.com/how-to/news/tactics-for-falling-water/",
        "quote": "5-inch Berkley Hollow Belly swimbait in gizzard shad... With the swimbait, I like to parallel the bluffs and make long casts. Then I count the bait down and slowly crank it back."
      },
      {
        "authority": "낚시춘추 · 최영교 프로",
        "url": "https://m.fishingseasons.co.kr/news_Detail.asp?b_no=8897",
        "quote": "배수기의 루어 중 최고의 루어를 뽑으라면 단연 섀드웜이다... 5인치 섀드웜에 블레이드를 장착하면 강한 진동에 더 강한 진동을 추가하고... 브레이크라인이나 장애물 지형에서 바닥의 장애물에 루어가 부딪쳐 밸런스가 깨지게 해주는 것이 필요하다."
      }
    ],
    "sourceCount": 2
  },
  {
    "id": "r08_autumn_drawdown_topwater",
    "title": "가을 배수기 잔여 커버·얕은 잔교 톱워터 기습",
    "lureId": "top_popper_pencil",
    "when": {
      "season": [
        "autumn"
      ],
      "waterTrend": [
        "falling"
      ],
      "time": [
        "dawn_dusk",
        "midday"
      ],
      "tempRange": [
        13,
        24
      ]
    },
    "effect": {
      "score": 8
    },
    "advice": {
      "colors": [
        "본 (Bone)",
        "아발론 섀드 / 고스트 미노우",
        "스켈레톤 차트루즈"
      ],
      "weight": "10~14g 원노커 워킹 펜슬베이트 (Heddon One Knocker Spook, Rover 128) 또는 프롭/포퍼 (Choppo, Boss Pop)",
      "trailer": "리어 페더(깃털) 트레블 훅",
      "action": "배수로 수면적이 줄어들어 베이트와 배스가 밀집된 '깊은 물 인접 잔여 커버(수몰나무·통나무·얕은 잔교)' 위를 빠르게 훑고, 입질이 나온 포인트는 1~2시간 간격으로 재진입"
    },
    "reason": "일반적인 통념과 달리 가을 배수기에는 수면적이 줄면서 오히려 남은 얕은 커버와 3ft 이하 잔교 밑으로 배스와 베이트피시가 고밀도로 압축되어 먹이 경쟁이 격화됩니다. 남들이 포기한 얕은 커버에 톱워터를 던지면 프레셔 없는 빅배스가 수면을 폭발시킵니다.",
    "sources": [
      {
        "authority": "Bassmaster Elite · Jason Christie",
        "url": "https://www.bassmaster.com/how-to/news/christie-fall-fishing-after-drawdowns/",
        "quote": "drawdowns concentrate fish in less water... as far as location, I like spots closest to deep water... I keep a Heddon One Knocker Spook and a Booyah Boss Pop on my deck."
      },
      {
        "authority": "Bassmaster · NC Drawdown Column",
        "url": "https://www.bassmaster.com/how-to/news/fishing-the-fall-drawdown/",
        "quote": "The majority of the quality bass... will come out of water that’s 3 feet deep or less and a lot of them will come from docks... I usually start fishing shallow docks with a topwater bait (Berkley J-Walker, Choppo)."
      },
      {
        "authority": "TacticalBassin · Matt Allen",
        "url": "https://www.tacticalbassin.com/blog/how-to-catch-suspended-bass-fishing-during-the-fall-draw-down",
        "quote": "Favorite Topwater Baits (Fall Draw Down): River2Sea Rover 128 (Abalone Shad, Ghost Minnow), Evergreen Shower Blows 125 (Skeleton Chartreuse, Bone)."
      },
      {
        "authority": "Wired2Fish · Terry Bolton & Casey Martin",
        "url": "https://www.wired2fish.com/fall-fishing/how-to-fish-isolated-cover-on-drawdowns",
        "quote": "When the water draws down in the fall, there is only so much cover left in the water... Isolated wood becomes a high-percentage target... topwaters (walking baits, buzzbaits, poppers)."
      }
    ],
    "sourceCount": 4
  },
  {
    "id": "r09_spring_autumn_jerkbait",
    "title": "봄·가을 전환기 서스펜딩 저크베이트 리액션 스냅",
    "lureId": "minnow_jerk",
    "when": {
      "season": [
        "spring",
        "autumn"
      ],
      "clarity": [
        "clear",
        "stained"
      ],
      "tempRange": [
        9,
        20
      ]
    },
    "effect": {
      "score": 9
    },
    "advice": {
      "colors": [
        "맑음+무풍(하이프레셔): GP 반투명 마감 (GP Pro Blue, Ghost Minnow)",
        "맑음+햇빛+바람(잔파도): GG 메탈릭 플래시 마감 (Silver Shad, Kasumi Ito)",
        "흐림/약탁수/콜드프런트 후: MAT 무광/솔리드 마감 (Mat Shad, Elegy Bone, Western Clown)"
      ],
      "weight": "110mm 스탠다드 서스펜딩 저크베이트 (10~12lb 플루오로카본 + #4~#6 세단 훅)",
      "trailer": "단독 운용",
      "action": "로드를 느리게 당기지 말고 느슨한 줄(slack line)을 날카롭게 끊어 치는 '크리스프 스냅(crisp snaps)'으로 다팅 액션을 만든 뒤 스테이. 수온이 낮거나 콜드프런트 직후에는 스테이 시간을 5~15초까지 길게 연장"
    },
    "reason": "수온 9~20°C의 봄(프리스폰~포스트스폰)·가을 전환기에는 저크베이트의 절도 있는 스냅 액션이 배스의 식욕과 무관한 공격 본능을 깨웁니다. 이때 햇빛·바람·물색에 맞춰 반투명(GP)·메탈릭(GG)·무광(MAT) 3가지 표면 마감을 교체하는 것이 핵심입니다.",
    "sources": [
      {
        "authority": "TacticalBassin · Matt Allen",
        "url": "https://www.tacticalbassin.com/blog/spring-jerkbait-fishing-beginner-and-advanced-tips",
        "quote": "The jerk bait draws on a bass' core response... work the baits with crisp snaps rather than slow pulls."
      },
      {
        "authority": "TacticalBassin · Matt Allen",
        "url": "https://www.tacticalbassin.com/blog/early-fall-jerkbait-fishing-for-bass-tips-tricks-colors-and-hook-upgrades-",
        "quote": "The early Fall transition is here, and bass are focusing on baitfish... Natural: Mat Shad, Tennessee Shad, Ghost Minnow / Bold: Elegy Bone, Western Clown."
      },
      {
        "authority": "Megabass USA · Color Guide",
        "url": "https://megabassusa.com/selecting-jerkbait-colors/",
        "quote": "Clear water + calm sun -> GP (Translucent) | Cloudy skies or stained water -> MAT (Matte) | Bright sun + wind or chop -> GG (Metallic)."
      }
    ],
    "sourceCount": 3
  },
  {
    "id": "r10_autumn_cranking",
    "title": "가을 턴오버·회유층 전 수심 크랭킹",
    "lureId": "deep_crank",
    "when": {
      "season": [
        "autumn"
      ],
      "struct": [
        "rock_slope",
        "deep_open"
      ],
      "tempRange": [
        12,
        23
      ]
    },
    "effect": {
      "score": 9
    },
    "advice": {
      "colors": [
        "맑은 물: 은색/아유/샤드 내추럴 계열",
        "탁한 물(녹조/턴오버): 차트루즈(형광) / 원색 계열"
      ],
      "weight": "목표 수심보다 0.5~1m 더 깊게 잠행하는 스펙 선택 (예: 2m 브레이크라인 → 2.5~3m 표기 모델)",
      "trailer": "워킹 10lb 나일론 / 보팅 10~12lb 카본",
      "action": "노리는 브레이크라인보다 5m 이상 멀리 캐스팅해 목표 지점에서 최대 잠행 수심에 도달하게 함. 한 자리에서 10회 연속 캐스팅하며 처음엔 빠르게 감다가 횟수마다 릴링 속도를 단계적으로 늦추고, 바닥이 느껴지면 감속해 띄워 장애물을 넘김"
    },
    "reason": "가을 배스는 바닥에만 머물지 않고 중상층 베이트피시 무리를 쫓아 오르내리므로 전 수심층을 대각선으로 훑는 크랭크베이트가 웜보다 빠른 해답이 됩니다. 물의 저항 때문에 실제 잠행 수심은 표기보다 얕으므로 0.5~1m 더 깊은 모델을 골라야 바닥을 찍을 수 있습니다.",
    "sources": [
      {
        "authority": "낚시춘추 · 손혁 프로",
        "url": "https://fishingseasons.co.kr/contents_view_detail.asp?b_no=2485",
        "quote": "물의 저항 같은 여러 변수 때문에 실제 루어는 제품에 표기된 잠행수심보다 덜 들어갑니다. 2m 수심이라고 2m 잠행수심 제품을 쓰면 바닥층을 찍지 못하고 지나치는 경우가 많아요. 2.5m나 3m 제품을 쓰는 게 맞습니다... 맑은 물색이면 은색 계열의 내추럴 컬러를 쓰고 탁한 물색엔 원색 계열을 쓰곤 합니다."
      },
      {
        "authority": "낚시춘추 · 유해일 KSA 프로",
        "url": "https://m.fishingseasons.co.kr/news_Detail.asp?b_no=13782",
        "quote": "가을은 크랭크베이트의 계절이다. 넓은 곳을 일정한 수심으로 공략할 수 있다. 내추럴 컬러는 물이 맑을 때 사용하고 챠트루즈 컬러는 반대로 물이 탁할 때 사용한다."
      },
      {
        "authority": "Outdoor Life · Fall Turnover Guide",
        "url": "https://www.outdoorlife.com/fishing/fall-turn-over-bass/",
        "quote": "use lipped crankbaits that can dive 15 to 20 feet deep and have 'tight' wobbles... Position your boat offshore from the point and cast big-lip crankbaits down it."
      }
    ],
    "sourceCount": 3
  },
  {
    "id": "r11_winter_cold_downshot",
    "title": "겨울 저수온 딥·급경사 경량 다운샷 & 무액션 롱스테이",
    "lureId": "downshot_rig",
    "when": {
      "tempRange": [
        4,
        10
      ],
      "struct": [
        "deep_open",
        "rock_slope"
      ]
    },
    "effect": {
      "score": 11
    },
    "advice": {
      "colors": [
        "그린펌킨",
        "고비(밀어) 펄 / 스몰마우스 시크릿",
        "스모크 블랙 퍼플 / 프로 블루 레드 펄"
      ],
      "weight": "1/16 ~ 1/8 oz (1.8~3.5g) 경량 텅스텐 싱커 + 4~6lb 극세사 플루오로카본 라인 + 단차 30cm~1m(수로 부상 배스 대응)",
      "trailer": "3.5~4인치 소형 플랫웜/C테일웜 + #2 세단 훅 노즈훅(코꿰기)",
      "action": "간척호·수로 급경사(드롭오프) 아래나 딥 스트럭처에 채비를 고정해 두고 10~60초간 인위적인 액션 없이 스테이. 동절기 수로 중층에 뜬 배스를 노릴 때는 단차를 50cm~1m까지 파격적으로 길게 줌"
    },
    "reason": "수온 10°C 이하 저수온기에는 배스가 최소한의 운동량으로 먹을 수 있는 작은 먹잇감만 노립니다. 호핑 시 포인트에서 쉽게 벗어나는 프리리그와 달리 다운샷은 급경사 바로 아래에 채비를 고정할 수 있고, 단차 조절로 바닥~중층 부상 배스를 모두 공략합니다.",
    "sources": [
      {
        "authority": "TacticalBassin · Tim Little",
        "url": "https://www.tacticalbassin.com/blog/10-dropshot-tricks-for-cold-winter-bass-fishing",
        "quote": "1) Go Smaller Than You Think 2) Go Slow 3) Downsize Your Line (4 to 6 lb Test) 4) Use Lighter Dropshot Weights (1/8 oz) 5) Focus on vertical presentations 6) Nose Hook Your Baits... 9) Expect Bites To Feel 'Heavy'."
      },
      {
        "authority": "낚시춘추 · 이정구 & 강시원 프로",
        "url": "https://m.fishingseasons.co.kr/news_Detail.asp?b_no=2298",
        "quote": "겨울 저수온기... 5lb 카본 라인 + 4인치 이하 C테일 웜 + 다운샷전용바늘 #2 + 1/16온스 싱커... 루어의 액션도 주지 않는다. 캐스팅한 뒤 슬랙라인만 조금 주고 기다리는데 최대 1분까지 반응이 없으면 다시 거둬들여..."
      },
      {
        "authority": "낚시춘추 · 박기현 KSA 프로 (동절기 수로·간척호)",
        "url": "https://m.fishingseasons.co.kr/news_Detail.asp?b_no=15852",
        "quote": "다운샷리그의 경우, 급경사 아래에 정확하게 채비를 넣어 둔 상태로 액션을 줄 수 있어 입질 받을 확률이 훨씬 높다... 겨울 배스는 바닥에서 살짝 떠 있는 경우가 많기에 단차를 최소 30cm, 길게는 50cm~1m 이상 주는 경우도 있다."
      }
    ],
    "sourceCount": 3
  },
  {
    "id": "r12_winter_metal_vibe",
    "title": "겨울 저수온 삭은 수초·딥 브레이크 메탈 리프트앤폴",
    "lureId": "metal_vibe",
    "when": {
      "tempRange": [
        4,
        10
      ],
      "struct": [
        "deep_open",
        "rock_slope",
        "shallow_weed"
      ]
    },
    "effect": {
      "score": 11
    },
    "advice": {
      "colors": [
        "크롬 (Chrome)",
        "골드/실버 플래싱 메탈"
      ],
      "weight": "평지형지·수초 끝자락: 10~14g 메탈바이브 (더블훅 튜닝) / 대형호·강계 초원투: 20~30g 캐스팅 메탈지그 (싱글훅)",
      "trailer": "밑걸림 방지를 위해 트레블훅을 더블훅(메탈바이브) 또는 싱글훅(메탈지그)으로 교체",
      "action": "바닥까지 완전히 가라앉힌 뒤 짧고 강하게 들어 올렸다 떨어뜨리는 리프트앤폴 반복. 평지형 저수지에서는 물속에 남은 삭은 수초·육초 끝자락을 스치듯 리프트앤폴하며, 폴링 순간의 라인 변화를 주시"
    },
    "reason": "겨울 배스는 '극도로 느린 스테이' 아니면 '강하게 떨리고 번쩍이는 금속성 리액션' 양극단에 반응합니다. 특히 평지형 저수지의 물속 삭은 수초 끝자락이나 깊은 자갈 브레이크라인에서 메탈 루어가 번쩍이며 떨어질 때 반사 입질이 집중됩니다.",
    "sources": [
      {
        "authority": "낚시춘추 · 겨울 루어 특집",
        "url": "https://fishingseasons.co.kr/contents_view_detail.asp?b_no=13913",
        "quote": "메탈바이브가 가장 잘 먹히는 곳은 삭은 육초나 수초가 많은 평지형지다. 더블훅으로 튜닝한 메탈바이브를 물속 수초의 끝자락에서 리프트앤폴로 공략하면 수초 속에 숨어있던 배스가 반사적으로 입질을 할 것이다... 20~30g 캐스팅 메탈지그... 크게 저킹 액션을 준 뒤 폴링되는 순간 입질이 집중된다."
      },
      {
        "authority": "낚시춘추 · 유해일 KSA 프로",
        "url": "https://m.fishingseasons.co.kr/news_Detail.asp?b_no=13782",
        "quote": "메탈지그: 깊은 수심의 바닥층에 배스들이 모여 있을 때 빠르게 잡아낼 수 있는 루어다. 무게는 21~30g을 주로 사용하고 크롬 컬러를 즐겨 사용하는 편."
      },
      {
        "authority": "Wired2Fish · Jason Sealock",
        "url": "https://www.wired2fish.com/bass-fishing/temperature-based-bass-lure-selector-chart",
        "quote": "Water Temp 32-45°F: Deep & Muddy -> Blade bait (Silver/Gold 1/2 oz)... vibrates hard enough for cold, sluggish bass to track in low visibility."
      }
    ],
    "sourceCount": 3
  },
  {
    "id": "r13_summer_heat_shade_frog",
    "title": "한여름 고수온 직사광선 수초 매트·그늘 프로그",
    "lureId": "hollow_frog",
    "when": {
      "season": [
        "summer"
      ],
      "tempRange": [
        25,
        32
      ],
      "struct": [
        "shallow_weed",
        "heavy_cover"
      ],
      "time": [
        "midday",
        "dawn_dusk"
      ]
    },
    "effect": {
      "score": 9
    },
    "advice": {
      "colors": [
        "블루길 패턴 (Killer Gill / MF Bluegill)",
        "내스티 섀드",
        "매트 블랙 (역광 실루엣)"
      ],
      "weight": "65mm 급 중대형 할로우 프로그 (MH~XH 로드 + 합사 50~65lb 직결)",
      "trailer": "합사 직결 필수 (수초 통째로 제압)",
      "action": "한낮 태양이 머리 위에 뜨면 얕은 물의 배스는 100% 마름·연밭 매트나 오버행의 짙은 그늘(shadow) 속으로 들어감. 그늘 가장자리와 매트 구멍 위로 프로그를 스키핑해 넣고 짧은 간격으로 제자리 독워킹"
    },
    "reason": "수온 25°C 이상 한낮에는 용존산소와 그늘을 제공하는 수초 매트 아래가 섈로우 배스의 유일한 은신처입니다. 50~65lb 합사에 연결한 할로우 프로그만이 밑걸림 없이 매트 위를 직공해 대물을 끌어낼 수 있습니다.",
    "sources": [
      {
        "authority": "TacticalBassin · Matt Allen & Tim Little",
        "url": "https://www.tacticalbassin.com/blog/how-to-catch-bass-when-its-hot-outside",
        "quote": "Shallow fish move into shadows... SPRO Bronzeye 65 Colors: Killer Gill, Nasty Shad, Navy Seal / Berkley Swamp Lord Colors: MF Bluegill, Bully."
      },
      {
        "authority": "낚시춘추 · 김진현 기자",
        "url": "https://m.fishingseasons.co.kr/news_Detail.asp?b_no=3127",
        "quote": "수온이 높은 상황에서 배스는 가급적 움직이려 하지 않는다. 낮에는 시원하고 산소가 많은 그늘진 얕은 곳에 숨어있는 걸 좋아하기 때문에 그런 곳을 찾아 인내심을 가지고 노릴 필요가 있다."
      }
    ],
    "sourceCount": 2
  },
  {
    "id": "r14_summer_heat_deep_crank",
    "title": "한여름 고수온 오프쇼어 렛지 매그넘·스피드 딥 크랭킹",
    "lureId": "deep_crank",
    "when": {
      "season": [
        "summer"
      ],
      "tempRange": [
        24,
        32
      ],
      "struct": [
        "deep_open",
        "rock_slope"
      ],
      "time": [
        "midday",
        "dawn_dusk"
      ]
    },
    "effect": {
      "score": 10
    },
    "advice": {
      "colors": [
        "차트루즈 섹시 섀드 (Chartreuse Sexy Shad)",
        "파우더 블루 백 차트",
        "메탈릭 섀드 / 내추럴 블루길"
      ],
      "weight": "4~6m+ 잠행 딥/매그넘 다이버 (Strike King 6XD/10XD, Tactical DD 75, Rapala DT16/20)",
      "trailer": "7'6\" MH 글라스/컴포지트 크랭킹 로드 + 12~15lb 플루오로카본",
      "action": "수온약층이 형성되는 수심 3~6m 본류 브레이크라인, 수중 험프, 채널 스윙 바닥에 립을 강하게 박은 뒤, 프레셔 받은 무리를 깨우기 위해 고속으로 릴링(burning)해 돌에 부딪혀 튕겨나가는 순간의 반사 입질 유도"
    },
    "reason": "여름 더위가 절정에 달하면 대형 배스들은 수온이 낮고 베이트피시가 몰리는 깊은 본류 렛지와 험프로 빠집니다. 큰 실루엣의 딥 다이버 크랭크베이트로 바닥을 빠르게 때려주면(speed cranking) 루어를 자세히 관찰할 틈을 주지 않고 본능적인 리액션 바이트를 끌어냅니다.",
    "sources": [
      {
        "authority": "TacticalBassin · Matt Allen",
        "url": "https://www.tacticalbassin.com/blog/summer-crankbait-fishing-everything-you-need-to-know",
        "quote": "This time of year we focus our attention on the two ends of the spectrum. We throw magnum deep divers and shallow crankbaits more than all the other categories combined."
      },
      {
        "authority": "TacticalBassin · Matt Allen & Tim Little",
        "url": "https://www.tacticalbassin.com/blog/how-to-catch-bass-when-its-hot-outside",
        "quote": "deep fish make room to let the giants feed. We target them during periods of high sun using large profile baits... CRANKBAITS: River2Sea Tactical DD 75 (Summer Minnow, Chartreuse Blue), Azuma Z Boss 22."
      },
      {
        "authority": "Wired2Fish · Keith Combs",
        "url": "https://www.wired2fish.com/fishing-videos/speed-fishing-deep-diving-crankbaits-for-summer-bass",
        "quote": "Speed fishing deep-diving crankbaits (Strike King 6XD) in the heat of the summer triggers reaction strikes from pressured offshore schools... Burning the crankbait and deflecting it hard off bottom structure."
      }
    ],
    "sourceCount": 3
  },
  {
    "id": "r15_strong_wind_spinnerbait",
    "title": "강풍 90° 바람맞이 연안 스피너베이트 집중",
    "lureId": "spinnerbait",
    "when": {
      "wind": [
        "strong"
      ]
    },
    "effect": {
      "score": 10
    },
    "advice": {
      "colors": [
        "차트루즈 & 화이트 (파도·탁수 시인성)",
        "내추럴 섀드 / 크롬 블레이드 (맑은 물 강풍)"
      ],
      "weight": "1/2 ~ 1 oz (14~28g) 헤비 스피너베이트 (강풍 비거리 및 수심 유지)",
      "trailer": "3.5~4.5인치 섀드웜 트레일러",
      "action": "바람이 정면 90°로 부딪히는 연안이나 45° 연안에서 90°로 꺾이는 곶부리(강풍이 이틀 이상 이어졌다면 바로 안쪽 첫 번째 홈통 코너 wrap-around)를 찾아 스피너베이트로 중상층 및 수몰나무 주변을 탐색"
    },
    "reason": "강풍이 불면 플랑크톤과 베이트피시가 바람이 90°로 때리는 연안으로 밀려들고 파도가 루어를 위장해 배스의 경계심이 풀립니다. 바람 때문에 라인이 날려 바닥 웜 채비는 운용이 불가능하므로 묵직한 스피너베이트가 최고의 무기가 됩니다.",
    "sources": [
      {
        "authority": "Bassmaster Elite · Jason Christie",
        "url": "https://www.bassmaster.com/news/working-out-windy-conditions/",
        "quote": "The biggest thing is that it’s hard to fish a bottom bait. On windy days, you’re usually fishing moving baits like spinnerbaits, squarebills and other crankbaits... I want to fish banks where the wind is hitting the bank at 90 degrees."
      },
      {
        "authority": "낚시춘추 · 유해일 KSA 프로",
        "url": "https://m.fishingseasons.co.kr/news_Detail.asp?b_no=13782",
        "quote": "오후부터 바람도 많이 불어주어... 바람이 불면 수면이 일렁이고 베이트피시들이 연안으로 몰리기 때문에... 꺼내든 것이 1온스 중량의 스피너베이트였다."
      }
    ],
    "sourceCount": 2
  },
  {
    "id": "r16_low_pressure_rain_moving",
    "title": "전선 접근·기압 하강·우천 로우라이트 고속 탐색",
    "lureId": "buzzbait",
    "when": {
      "sky": [
        "rain",
        "overcast"
      ],
      "pressure": [
        "falling"
      ]
    },
    "effect": {
      "score": 9
    },
    "advice": {
      "colors": [
        "블랙 / 매트 블랙 (흐린 하늘 역광 실루엣)",
        "화이트 / 차트루즈"
      ],
      "weight": "3/8 ~ 1/2 oz 더블 버즈베이트 또는 클래커 버즈베이트 + 트레일러 훅",
      "trailer": "미스바이트 방지를 위한 트레일러 훅 필수",
      "action": "기압이 떨어지고 비구름이 끼면 배스가 커버에서 나와 얕은 연안을 돌아다니며 사냥하므로, 한 자리에 머물지 말고 고립된 나무·바위·수초 엣지 위를 버즈베이트로 빠르게 지치며 활성 개체를 색출"
    },
    "reason": "전선이 다가오며 기압이 하강하고 비·구름으로 조도가 낮아지면 배스는 곧 닥칠 한랭전선을 본능적으로 감지해 폭식을 시작합니다. 수면 경계심이 완전히 사라지므로 소음과 파동이 큰 버즈베이트로 넓게 훑는 것이 가장 효율적입니다.",
    "sources": [
      {
        "authority": "Bassmaster Elite · Luke Palmer",
        "url": "https://www.bassmaster.com/column/luke-palmer/fishing-nasty-rainy-days-in-the-fall/",
        "quote": "Fishing nasty, rainy days... I’ll look for any isolated item... This time of year, I like a BOOYAH Counterstrike double buzzbait, or the old reliable War Eagle Screaming Eagle spinnerbait."
      },
      {
        "authority": "Bassmaster Elite · Bill Lowen",
        "url": "https://www.bassmaster.com/go-fish/news/catching-fish-in-cold-front-conditions-takes-strategy/",
        "quote": "When approaching fronts bring cloudy, windy conditions and falling barometric pressure, bass are most likely to roam and search for food... I’m going to use a moving bait where I can cover water."
      }
    ],
    "sourceCount": 2
  },
  {
    "id": "r17_coldfront_highpressure_neko",
    "title": "콜드프런트·고기압 블루버드 직벽·커버 네꼬리그 데드스틱킹",
    "lureId": "neko_rig",
    "when": {
      "pressure": [
        "rising",
        "high"
      ],
      "clarity": [
        "clear",
        "stained"
      ]
    },
    "effect": {
      "score": 9
    },
    "advice": {
      "colors": [
        "그린펌킨 (Green Pumpkin)",
        "워터멜론 코퍼/레드",
        "미미즈(지렁이) / 내추럴 섀드"
      ],
      "weight": "1/20 ~ 3/32 oz (1.4~2.7g) 텅스텐 네일싱커 + 6~8lb 플루오로카본 리더 + 5~6mm 오링",
      "trailer": "5인치 스트레이트 스틱웜 (Yamamoto Senko 5\", 스왐프크롤러) + #1~#1/0 네꼬 전용 훅",
      "action": "콜드프런트 직후 직사광선을 피해 그늘진 커버 속이나 수직 암반 직벽(bluff) 아래로 내려간 개체에게 자유 폴링시킨 뒤, 호핑하지 않고 제자리에서 멈춰 미세하게만 흔드는 데드스틱킹(deadsticking) 운용"
    },
    "reason": "기압이 급상승(1020hPa+)하고 구름 없는 블루버드 스카이가 되면 눈꺼풀이 없는 배스는 커버 깊숙이 박히거나 직벽 깊은 수심으로 내려가 입을 닫습니다. 머리에 네일싱커를 박은 네꼬리그는 목표 수심까지 빠르게 내려가면서도 제자리에서 양 끝이 미세하게 떨려 고기압 배스의 입을 열게 합니다.",
    "sources": [
      {
        "authority": "Bassmaster · David A. Brown & Bill Lowen",
        "url": "https://www.bassmaster.com/go-fish/news/catching-fish-in-cold-front-conditions-takes-strategy/",
        "quote": "once it breaches the 'high-pressure' threshold — over 30.2 inHg — opportunity declines... You’ll also tempt them by free-falling a wacky-rigged stickworm (add a nail weight to the head if you need to reach the fish faster)... 'The other thing I like to do is deadstick the bait.'"
      },
      {
        "authority": "TacticalBassin · Matt Allen",
        "url": "https://www.tacticalbassin.com/blog/top-baits-for-winter-bass-fishing-cold-water-fishing",
        "quote": "NEKO RIG: Bait- Yamamoto Senko 5\" Colors: Wtrmln copper org/red, Green Pumpkin Purp Copper, Green Pumpkin + Swagger Tungsten Pagoda Weight + VMC Crossover 6MM."
      }
    ],
    "sourceCount": 2
  },
  {
    "id": "r18_night_black_spinnerbait",
    "title": "야간 쇼어라인 대형 콜로라도 스피너베이트 슬로우 롤링",
    "lureId": "spinnerbait",
    "when": {
      "time": [
        "night"
      ],
      "tempRange": [
        14,
        30
      ]
    },
    "effect": {
      "score": 9
    },
    "advice": {
      "colors": [
        "블랙 & 블루 / 솔리드 블랙 (밤하늘 역광 최강 실루엣)",
        "차트루즈 (탁수 야간)"
      ],
      "weight": "1/2 ~ 3/4 oz (14~21g) 헤비듀티 스피너베이트 + 대형 콜로라도 블레이드 + 14~17lb 라인",
      "trailer": "4~4.8인치 패들테일 섀드웜 또는 트레일러 훅",
      "action": "정면 오픈워터보다 베이트피시의 퇴로가 차단된 양측면 연안(쇼어라인)과 평행하게 캐스팅해, 대형 콜로라도 블레이드가 천천히 회전하며 묵직한 파동을 내는 정속 슬로우 롤링으로 발 앞까지 끝까지 릴링"
    },
    "reason": "밤에는 배스가 시각 대신 측선으로 파동을 감지하고 위쪽 밤하늘을 배경으로 검은색 실루엣을 가장 뚜렷하게 인식합니다. 저항이 큰 콜로라도 블레이드로 연안 쇼어라인을 따라 천천히 감아주면 어둠 속에서 루어를 추격하던 대형 배스에게 정확한 타격 시간을 제공합니다.",
    "sources": [
      {
        "authority": "낚시춘추 · 박용근 프로",
        "url": "https://fishingseasons.co.kr/contents_view_detail.asp?b_no=12620",
        "quote": "정면의 오픈된 공간보다 양측면의 쇼어라인을 위주로 공략하는 방식이 효과적이다... 밤낚시에는 다소 크다 싶은 콜로라도형 블레이드가 유리하다. 콜로라도 블레이드는 윌로우 리프보다 진동을 많이 발생시킨다. 저항이 커서 상대적으로 느린 속도의 리트리브로 밤배스에게 어필할 수 있는 시간적 여유를 제공해준다."
      },
      {
        "authority": "TacticalBassin · Matt Allen",
        "url": "https://www.tacticalbassin.com/blog/night-fishing-for-bass-everything-you-need-to-know",
        "quote": "Fast Moving Baits (Night): Spinnerbait (Giant Fish)- Revenge Heavy Duty / Bladed Jig- Chatterbait Custom 1/2 oz / Swim Jig 1/2 & 3/4 oz + Keitech 4.8\" Swimbait."
      },
      {
        "authority": "Bassmaster · Bobby Gentry",
        "url": "https://www.bassmaster.com/how-to/news/bass-after-dark-part-2-gear/",
        "quote": "As for line size, I generally stick with 10-12-pound test if the water’s clear and go a little heavier (14-17) if it’s stained. I’ll also use the heavier line with certain baits, like jigs and spinnerbaits."
      }
    ],
    "sourceCount": 3
  },
  {
    "id": "r19_night_bottom_big_worm_jig",
    "title": "야간 대물 선별용 래틀 러버지그 & 글라스 비드 빅웜",
    "lureId": "free_rig",
    "when": {
      "time": [
        "night"
      ],
      "struct": [
        "rock_slope",
        "heavy_cover",
        "deep_open"
      ]
    },
    "effect": {
      "score": 9
    },
    "advice": {
      "colors": [
        "블랙 & 블루 (Black/Blue)",
        "준버그 (Junebug - 보라+펄)",
        "플럼 (Plum)"
      ],
      "weight": "3/8 ~ 3/4 oz (10.5~21g) 텅스텐/황동 싱커 + 글라스 비드(딸깍거리는 음향 추가) + 낮보다 한 단계 굵은 14~16lb 라인",
      "trailer": "8~10인치 대형 컬리테일/리본테일 웜 또는 볼륨 큰 브러시호그/호그웜",
      "action": "표층·중층 루어에 반응하지 않는 대형 개체를 노려 바닥에 가라앉힌 뒤, 텅스텐 싱커와 글라스 비드가 부딪히며 소리를 내도록 천천히 드래깅 & 스테이"
    },
    "reason": "어둠 속에서는 라인 굵기나 큰 루어 크기에 대한 배스의 경계심이 사라집니다. 오히려 8~10인치 빅웜이나 호그웜의 큰 수류 파동과 텅스텐 싱커+글라스 비드의 클릭 소음이 합쳐져야 야간 바닥층의 런커급 배스가 위치를 파악하고 덮칩니다.",
    "sources": [
      {
        "authority": "낚시춘추 · 박용근 프로",
        "url": "https://fishingseasons.co.kr/contents_view_detail.asp?b_no=12620",
        "quote": "텍사스리그는 텅스텐 싱커와 글라스 비드를 조합하여 바닥에서 튕길 때 소음을 발생시킬 수 있도록 고려한다. 밤에 바닥을 공략할 경우, 대형급과의 만남을 기대해도 좋다. 라인을 낮 시간대보다 좀 더 굵게 쓰는 것이 좋고, 루어도 좀 더 크게(8인치 컬리테일 웜) 사용하는 것이 유리하다."
      },
      {
        "authority": "TacticalBassin · Matt Allen",
        "url": "https://www.tacticalbassin.com/blog/night-fishing-for-bass-everything-you-need-to-know",
        "quote": "Slow Moving Baits (Night): Worm- 10\" Power Worm / Creature- Zoom Brush Hog + Brass Bullet Weight + Glass Beads + Jig Rattles with Collar."
      },
      {
        "authority": "TacticalBassin · Summer Heat & Night",
        "url": "https://www.tacticalbassin.com/blog/how-to-catch-bass-when-its-hot-outside",
        "quote": "NIGHT BAITS: Dirty Jigs No Jack Flippin Jig (3/4 oz, Hematoma) + Xzone 4\" Muscle Back Craw (Black Blue) / Xzone Blitz Worm (Black Blue, Plum) + VMC Tungsten (3/4 oz)."
      }
    ],
    "sourceCount": 3
  },
  {
    "id": "r20_freerig_structure_weight_shift",
    "title": "프리리그 2단계 무게 전환 & 무중력 나선 폴링",
    "lureId": "free_rig",
    "when": {
      "struct": [
        "rock_slope",
        "deep_open",
        "heavy_cover"
      ],
      "time": [
        "dawn_dusk",
        "midday"
      ]
    },
    "effect": {
      "score": 7
    },
    "advice": {
      "colors": [
        "맑은 물: 그린펌킨 페퍼 / 워터멜론 시드",
        "보통/로우라이트: 그린펌킨 블루펄 / 시나몬 (+ 글라스 비드 추가)",
        "탁수: 블랙 & 블루 / 준버그"
      ],
      "weight": "1단계 지형 탐색·강풍·급심: 3/8 ~ 1/2 oz (10.5~14g) 컴팩트 텅스텐 싱커 / 2단계 복잡 장애물 돌파: 3/16 ~ 1/4 oz (5.3~7g) 경량 전환",
      "trailer": "폴링 바이트용 호그웜/크리처웜 (돌기·꼬리가 많아 천천히 가라앉는 형태)",
      "action": "먼저 무거운 텅스텐 싱커로 넓게 원투해 험프나 물골(툭 떨어지는 자리)을 찾은 뒤, 복잡한 장애물 구간에서는 가벼운 싱커로 바꿔 걸림을 줄임. 리프트앤폴 후 싱커가 먼저 착저하고 웜이 따로 천천히 떨어질 때 여윳줄(슬랙라인)을 감지 말고 그대로 두어 무중력 바이트 유도"
    },
    "reason": "프리리그의 핵심은 고밀도 텅스텐 싱커가 먼저 바닥을 찍은 직후 웜이 노싱커 상태로 천천히 가라앉는 '폴링 속도 급변(나선형 무중력 폴링)'에 있습니다. 착저 직후 여윳줄을 감아버리면 이 무중력 액션이 사라지므로 슬랙라인을 유지해야 빅배스가 이물감 없이 삼킵니다.",
    "sources": [
      {
        "authority": "낚시춘추 · 김선필 프로 (프리리그 연구)",
        "url": "https://m.fishingseasons.co.kr/news_Detail.asp?b_no=3474",
        "quote": "바닥 탐색을 할 때는 무거운 봉돌이 달린 프리 리그를 써야 멀리 캐스팅할 수 있고 바닥을 더 세밀하게 읽어 나갈 수 있다... 복잡한 장애물을 공략할 때에는 가벼운 봉돌로 바꾸어... 봉돌이 바닥에 닿은 후엔 폴링 속도가 현격하게 줄어드는 현상이 생긴다. 처음 가라앉은 그대로 두어야 입질을 받을 확률을 더 높일 수 있다."
      },
      {
        "authority": "Bassmaster · Gettys Brannon",
        "url": "https://www.bassmaster.com/bass-basics/news/the-texas-rig-part-4-variable-changes/",
        "quote": "Tungsten also allows easy translation of bottom composition... The unattached sinker slides freely down the line, reaching the bottom first allowing the soft plastic to spiral downward for added action."
      },
      {
        "authority": "Bassmaster · Gettys Brannon (Weight Selection)",
        "url": "https://www.bassmaster.com/bass-basics/news/the-texas-rig-part-3-weight-selection/",
        "quote": "With larger worms that work best being dragged across bottom, heavier weights such as 3/8 to 1/2 ounce are needed to maintain constant contact... When the wind is strong, you need to equip your rig with a heavier weight."
      },
      {
        "authority": "Wired2Fish · Jason Sealock",
        "url": "https://www.wired2fish.com/buyers-guides/best-fishing-weights-and-sinker-types",
        "quote": "Tungsten is much denser than lead, meaning a 1/2-ounce tungsten weight is significantly smaller in profile than a 1/2-ounce lead weight and transmits bottom composition (rock vs. mud vs. shell) much better."
      }
    ],
    "sourceCount": 4
  },
  {
    "id": "r21_clear_mid_strolling_single",
    "title": "맑은 물 중층 서스펜드 호버·미드스트롤링",
    "lureId": "mid_strolling",
    "when": {
      "clarity": [
        "clear",
        "stained"
      ],
      "struct": [
        "deep_open",
        "rock_slope"
      ],
      "wind": [
        "calm",
        "moderate"
      ]
    },
    "effect": {
      "score": 9
    },
    "advice": {
      "colors": [
        "홀로그램 섀드 (Hologram Shad)",
        "스모킨 섀드 (Smokin Shad)",
        "알비노 / 배드 섀드"
      ],
      "weight": "호버스트롤링: 1/96 ~ 3/32 oz (0.3~2.7g) 텅스텐 네일싱커 + L형 호버 훅 / 미드: 0.9~1.8g(1/32~1/16oz) 90° 지그헤드 또는 스몰러버지그",
      "trailer": "3~5인치 노액션 세장형 미노우/핀테일/중공 피시웜 (ZMan Jerk Shadz 4\", Super Fluke Jr, 3인치 중공 피시웜)",
      "action": "로드를 60° 각도로 세우고 가볍게 위아래로 털어주며(shaking) 릴 핸들을 1초에 1바퀴 속도로 감아 중층 수평 롤링 유영 연출. 맑은 물 사이트피싱 시에는 1/96oz(0.3g) 호버 채비로 배스 눈앞을 극슬로우 폴링"
    },
    "reason": "맑은 물에서 바닥 채비에 학습된 배스는 중층에 떠서 회유합니다. 0.3~1.8g 극경량 웨이트를 활용한 호버·미드스트롤링은 중층에서 상처 입은 베이트피시의 번뜩이는 롤링 파동을 가장 자연스럽게 재현해 하이프레셔 배스의 입을 엽니다.",
    "sources": [
      {
        "authority": "TacticalBassin · Matt Allen & Tim Little",
        "url": "https://www.tacticalbassin.com/blog/buyers-guide-hover-strolling-and-mid-strolling",
        "quote": "HOVER STROLLING: Ryugi Hover Shot Hook Size 3, 2 + Reins Tungsten Nail Size 3/32 - 1/96 + ZMan 4\" Jerk Shadz / Zoom Super Fluke Jr (Hologram Shad, Smokin Shad, Albino)."
      },
      {
        "authority": "낚시춘추 · 박기현 KSA 프로 (호버스트롤링 특집)",
        "url": "https://m.fishingseasons.co.kr/news_Detail.asp?b_no=15638",
        "quote": "호버스트롤링은 극도로 가벼운 싱커(1/96온스 텅스텐 네일싱커)와 특수한 바늘(L형 훅)을 사용해 웜이 물속에서 거의 떠 있는 듯한(Hovering) 수평 자세로 극도로 느리게 폴링하고 유영하게 만드는 기법이다."
      },
      {
        "authority": "낚시춘추 · 최영교 프로",
        "url": "https://m.fishingseasons.co.kr/news_Detail.asp?b_no=8547",
        "quote": "미드스트롤링: 중층을 공략하는 방법이다. 1/16온스 스몰러버지그에 3~4인치 웜을 세팅한 후, 바닥에서 루어를 띄운 상태에서 로드를 60도 각도로 세우고 가볍게 위아래로 흔들어주며 천천히 감아들인다."
      },
      {
        "authority": "Wired2Fish · Sam Hanggi",
        "url": "https://www.wired2fish.com/bass-fishing/winter-bass-lures",
        "quote": "An overcast day tends to make the bass roam and suspend more in the water column... This is when a jighead minnow (Damiki rig / strolling) shines."
      }
    ],
    "sourceCount": 4
  },
  {
    "id": "r22_prespawn_stained_cover_jig",
    "title": "초봄 프리스폰 탁수·커버 래틀 벌키 러버지그",
    "lureId": "rubber_jig",
    "when": {
      "season": [
        "spring"
      ],
      "tempRange": [
        8,
        15
      ],
      "clarity": [
        "stained",
        "muddy"
      ],
      "struct": [
        "heavy_cover",
        "rock_slope",
        "shallow_weed"
      ]
    },
    "effect": {
      "score": 10
    },
    "advice": {
      "colors": [
        "크로우피시 (Crawfish - 가재 패턴)",
        "블랙 & 블루",
        "그린펌킨 오렌지"
      ],
      "weight": "3/8 ~ 1/2 oz (10.5~14.2g) 래틀 장착 러버지그",
      "trailer": "저수온: 물 저항이 커서 천천히 폴링하는 대형 청크/비버 트레일러 / 수온 상승기: 킥이 빠른 크로우 트레일러",
      "action": "산란장으로 이동하는 길목(채널 스윙·수몰나무)에 수직에 가깝게 피칭. 수온이 낮을수록 트레일러 볼륨을 키워 폴링 속도를 늦추고 바닥에서 천천히 드래깅"
    },
    "reason": "초봄 프리스폰 배스의 핵심 먹이는 바닥에서 깨어나는 가재입니다. 물색이 탁하고 커버가 빽빽할 때는 래틀과 볼륨 큰 트레일러로 수류 파동을 키우되, 수온이 낮을수록 폴링 속도를 늦춰야 저활성 빅배스가 흡입합니다.",
    "sources": [
      {
        "authority": "Bassmaster · Kevin VanDam",
        "url": "https://www.bassmaster.com/how-to/news/prespawn-power-fishing-with-jigs/",
        "quote": "If the water is more stained and I’m fishing thick cover, I use a bulkier jig-and-trailer with a rattle... If the water is cold, I want it falling slower; if warming, I want a faster falling and more erratic jig."
      },
      {
        "authority": "TacticalBassin · Matt Allen",
        "url": "https://www.tacticalbassin.com/blog/top-5-baits-for-muddy-water-bass-fishing",
        "quote": "Focus on lures that have flash, vibration, and bold colors... Dirty Jigs 1/2 oz Pitchin' Jig (Hematoma, Blackend Blue) + Reaction Innovations Kinky Beaver."
      },
      {
        "authority": "Wired2Fish · Jamie Horton",
        "url": "https://www.wired2fish.com/spring-fishing-tips/do-you-know-how-to-fish-laydowns-for-big-bass",
        "quote": "pick apart the trunk and heavy forks with a 1/2-ounce jig on 20-pound fluorocarbon."
      }
    ],
    "sourceCount": 3
  },
  {
    "id": "r23_spring_spawn_fluke_nosinker",
    "title": "봄 산란·포스트스폰 수초·커버 노싱커 플루크 다팅",
    "lureId": "no_sinker",
    "when": {
      "season": [
        "spring"
      ],
      "tempRange": [
        14,
        21
      ],
      "clarity": [
        "clear",
        "stained"
      ],
      "struct": [
        "shallow_weed",
        "heavy_cover"
      ]
    },
    "effect": {
      "score": 10
    },
    "advice": {
      "colors": [
        "알비노 / 화이트 (Albino - 산란장 시인성 & 섀드 매칭)",
        "스모킨 섀드 (Smokin Shad)",
        "프로 블루 레드 펄"
      ],
      "weight": "노싱커 (오픈 수초 위: #1/0 Finesse Wide Gap 노즈훅 / 커버 직공: #4/0 Superline EWG 오프셋 훅)",
      "trailer": "5인치 소프트 저크베이트 (Zoom Super Fluke) 또는 5인치 뚱뚱한 스틱웜",
      "action": "트레블 훅 하드 저크베이트를 넣기 힘든 얕은 수초·산란장 주변에서 연속 트위칭으로 불규칙 다팅 액션을 준 뒤 수평 글라이딩 폴링"
    },
    "reason": "산란기~포스트스폰 배스가 얕은 수초나 커버 속으로 들어가 하드 저크베이트의 트레블 훅에 경계심을 보일 때, 노싱커 플루크는 밑걸림 없이 동일한 불규칙 다팅(darting) 리액션과 무중력 폴링을 연출합니다.",
    "sources": [
      {
        "authority": "TacticalBassin · Matt Allen",
        "url": "https://www.tacticalbassin.com/blog/jerkbait-and-fluke-fishing-tricks-for-spring-bass-fishing",
        "quote": "Soft Jerkbait... Zoom Super Fluke Colors: Albino, Smokin Shad, Pro Blue Red Pearl ... Nose Hook- Gamakatsu Finesse Wide Gap (1/0) ... Texas Rig- Gamakatsu Superline EWG (4/0)"
      },
      {
        "authority": "Bassmaster Elite · Jason Christie",
        "url": "https://www.bassmaster.com/slideshow/jason-christies-postspawn-baits-and-tactics/",
        "quote": "Target postspawn migration routes and transition areas... Use white to match live shad... When the crankbait bite goes cold, I switch over to this [soft plastic] bait and give them something different."
      }
    ],
    "sourceCount": 2
  },
  {
    "id": "r24_falling_pressure_overcast_chatterbait",
    "title": "한랭전선 접근·기압 하강 로우라이트 채터베이트 서치",
    "lureId": "chatterbait",
    "when": {
      "sky": [
        "rain",
        "overcast"
      ],
      "pressure": [
        "falling"
      ]
    },
    "effect": {
      "score": 10
    },
    "advice": {
      "colors": [
        "그린펌킨 차트",
        "화이트 & 차트루즈",
        "파이어 크로우 (탁수 동반 시)"
      ],
      "weight": "3/8 ~ 1/2 oz (10.5~14.2g) 블레이드 지그 (Thunder Cricket, JackHammer)",
      "trailer": "3.5~4.5인치 핀테일 또는 섀드 트레일러",
      "action": "전선 접근으로 기압이 떨어지고 구름·바람이 일 때 은신처를 나와 회유하는 활성 배스를 노려 수초 엣지·그루터기·바위 주변을 빠르게 커버 워터"
    },
    "reason": "한랭전선이 다가오며 기압이 하강하고 흐린 날씨가 형성되면 배스는 곧 닥칠 기온 급강하에 대비해 공격적으로 먹이를 찾아 돌아다닙니다. 강한 진동으로 넓은 면적을 빠르게 탐색하는 채터베이트가 전선 통과 직전 폭식 타이밍에 최적입니다.",
    "sources": [
      {
        "authority": "Bassmaster Elite · Bill Lowen",
        "url": "https://www.bassmaster.com/go-fish/news/catching-fish-in-cold-front-conditions-takes-strategy/",
        "quote": "When approaching fronts bring cloudy, windy conditions and falling barometric pressure, bass are most likely to roam and search for food... 'I’m going to use a moving bait where I can cover water. That could be a Strike King Thunder Cricket (bladed jig), a flat-sided crankbait or a spinnerbait.'"
      },
      {
        "authority": "Bassmaster Elite · Bill Weidler",
        "url": "https://www.bassmaster.com/how-to/slideshow/elites-top-muddy-water-baits/",
        "quote": "A Z-Man Evergreen Chatterbait Jackhammer... produces that bladed jig vibration that is key for bass feeding on their senses of sight and sound."
      }
    ],
    "sourceCount": 2
  },
  {
    "id": "r25_korea_reclaimed_rock_kaizer_pilot",
    "title": "한국 간척호·워킹 석축 1/8oz 카이젤 파일럿 & 행오프",
    "lureId": "kaizer_rig",
    "when": {
      "struct": [
        "rock_slope",
        "deep_open"
      ],
      "clarity": [
        "clear",
        "stained"
      ],
      "wind": [
        "calm",
        "moderate"
      ]
    },
    "effect": {
      "score": 9
    },
    "advice": {
      "colors": [
        "그린펌킨 (Green Pumpkin)",
        "브라운 / 어스웜(지렁이)",
        "워터멜론 레드"
      ],
      "weight": "1단계 파일럿 수심·험프 탐색: 1/8 oz (3.5g) 지그헤드 / 2단계 석축 틈새 커브폴링: 1/16 oz (1.8g) / 3단계 데드워밍: 1/32 oz (0.9g)",
      "trailer": "4~5인치 스트레이트 웜(중앙 체결) 또는 3인치 가재웜(석축 밑걸림 방지 커브폴링용)",
      "action": "처음 선 워킹 포인트나 평택호·부남호 등 간척호 석축에서 1/8oz 카이젤리그로 바둑판식 20회 캐스팅하며 폴링 카운트로 수심과 석축이 끝나는 턱을 파악. 석축과 뻘 바닥 경계 턱에 1~2초 걸쳤다 톡 빼내는 행오프(hang-off)와 1/16oz 커브폴링(바닥 드래깅 금지)으로 공략"
    },
    "reason": "배스 활성도가 낮거나 수심·지형을 모르는 국내 워킹 필드에서는 어필력이 과한 스피너베이트보다 1/8oz 카이젤리그가 최고의 파일럿 루어입니다. 특히 간척호 연안 석축은 돌 틈 밑걸림이 심하므로 드래깅 대신 커브폴링과 석축 끝 턱 행오프를 구사해야 손실 없이 빅배스를 낚습니다.",
    "sources": [
      {
        "authority": "낚시춘추 · 손혁 프로 (파일럿 루어 기법)",
        "url": "https://m.fishingseasons.co.kr/news_Detail.asp?b_no=3889",
        "quote": "내가 파일럿 루어로 가장 애용하는 것은 뜻밖에도 1/8온스 지그헤드를 사용한 카이젤리그다... 1/8온스 지그헤드는 초당 약 50cm 가라앉으므로 카운트다운을 통해 수심을 정확히 알 수 있고... 약 20회 바둑판식으로 캐스팅하면 물속 지형도가 머릿속에 그려진다."
      },
      {
        "authority": "낚시춘추 · 손혁 프로 (간척호 석축 로테이션)",
        "url": "https://m.fishingseasons.co.kr/news_Detail.asp?b_no=9480",
        "quote": "석축이 끝나는 지점(석축과 바닥 뻘이 만나는 경계)에서 채비를 살짝 걸쳤다가 빼내는 '행오프(Hang-off)' 기법으로 입질을 유도한다... 석축 틈새에 빠지지 않도록 바닥을 질질 끄는 드래깅 대신, 라인 텐션을 유지해 대각선으로 유영해 내려오는 '커브폴링(Curve falling)' 위주로 운용해야 밑걸림을 줄이고 폴링 바이트를 유도할 수 있다."
      },
      {
        "authority": "Wired2Fish · Jason Sealock",
        "url": "https://www.wired2fish.com/bass-fishing/temperature-based-bass-lure-selector-chart",
        "quote": "Water Temp 45-55°F Clear: Ned rig, shaky head, suspending jerkbait... 65-75°F Clear: Topwater walker, shaky head, swimbait."
      }
    ],
    "sourceCount": 3
  },
  {
    "id": "r26_korea_neko_algae_rock_hangoff",
    "title": "한국 수상좌대·청태 바닥·석축 네꼬리그 4대 비법",
    "lureId": "neko_rig",
    "when": {
      "struct": [
        "rock_slope",
        "heavy_cover",
        "shallow_weed"
      ],
      "clarity": [
        "clear",
        "stained"
      ],
      "tempRange": [
        11,
        27
      ]
    },
    "effect": {
      "score": 8
    },
    "advice": {
      "colors": [
        "시나몬 블루플레이크 (Cinnamon Blue Flake)",
        "그린펌킨",
        "워터멜론 시드"
      ],
      "weight": "1/16 ~ 1/8 oz (1.8~3.5g) 네일/인서트 싱커 (수상좌대 안쪽 사선 폴링 시 사선 삽입)",
      "trailer": "4~6인치 스트레이트 웜 + 5~6mm 실리콘 튜브/오링 + 네꼬 전용 훅 (모기 바늘/와이드갭)",
      "action": "① 수상좌대 아래로 넣을 땐 싱커를 사선으로 박아 좌대 안쪽으로 파고들게 폴링 ② 청태나 잔돌이 많은 한국 저수지 바닥에서는 웜이 바닥에 완전히 쓰러지기 전(착저 후 1~1.5초 이내)에 다음 호핑을 시작해 바늘에 청태가 묻는 것을 원천 차단 ③ 석축 턱에서는 살짝 걸쳤다 빼는 행오프"
    },
    "reason": "한국 저수지 특유의 바닥 청태(이끼)가 바늘에 한 올이라도 묻으면 배스는 절대 입질하지 않습니다. 싱커만 바닥을 찍고 웜이 쓰러지기 직전(1~1.5초)에 연속 호핑하면 청태와 석축 밑걸림을 동시에 피하면서 바닥을 쪼는 베이트피시를 완벽히 연출합니다.",
    "sources": [
      {
        "authority": "낚시춘추 · 손혁 프로 (네꼬리그 4대 비법)",
        "url": "https://m.fishingseasons.co.kr/news_Detail.asp?b_no=4895",
        "quote": "싱커를 비스듬히 박아 넣으면 수상좌대 같은 장애물 안쪽으로 파고드는 사선 폴링을 유도할 수 있다... 싱커가 바닥에 닿은 뒤 웜이 완전히 바닥에 쓰러지기까지는 약 1~1.5초의 시간이 걸리는데, 웜이 다 쓰러지기 전에 다음 호핑 동작을 시작하면 바늘이 바닥 돌 틈이나 청태에 닿지 않아 밑걸림과 이물질 걸림을 완벽히 방지할 수 있다."
      },
      {
        "authority": "Bassmaster · David A. Brown & Bill Lowen",
        "url": "https://www.bassmaster.com/go-fish/news/catching-fish-in-cold-front-conditions-takes-strategy/",
        "quote": "You’ll also tempt them by free-falling a wacky-rigged stickworm (add a nail weight to the head if you need to reach the fish faster)."
      }
    ],
    "sourceCount": 2
  },
  {
    "id": "r27_early_spring_finesse_small_rubber_jig",
    "title": "초봄 저수온·포스트스폰 1/8oz 이하 피네스 스몰러버지그",
    "lureId": "rubber_jig",
    "when": {
      "season": [
        "spring",
        "winter"
      ],
      "tempRange": [
        5,
        14
      ],
      "clarity": [
        "clear",
        "stained"
      ],
      "struct": [
        "shallow_weed",
        "rock_slope",
        "deep_open"
      ],
      "wind": [
        "calm",
        "moderate"
      ]
    },
    "effect": {
      "score": 9
    },
    "advice": {
      "colors": [
        "그린펌킨 (Green Pumpkin)",
        "브라운 / 가재 컬러",
        "블랙 (수초 그림자 대비)"
      ],
      "weight": "1/16 ~ 1/8 oz (1.8~3.5g) 실리콘 스커트 스몰러버지그 (브러시가드 1~2가닥만 남기고 컷팅 추천)",
      "trailer": "2~3인치 소형 크로우/호그/슈림프 웜 또는 3인치 핀테일 웜",
      "action": "초봄 삭은 수초대·수몰나무·돌바닥에서 20~30cm 짧은 2회 호핑 후 10초 스테이, 또는 극저활성 시 바닥을 50cm 천천히 끌고(dragging) 30초 스테이. 스커트가 물속에서 스스로 하늘거리며 저활성 배스를 유혹함"
    },
    "reason": "3~4월 초봄 일교차가 큰 시기나 산란 직후 지친 배스는 빠른 하드베이트나 무거운 지그를 쫓지 못합니다. 1/8oz(3.5g) 이하 스몰러버지그는 느린 폴링과 실리콘 스커트의 미세한 자체 파동으로 가만히 멈춰 있는 스테이 중에도 강한 생명감을 전달합니다.",
    "sources": [
      {
        "authority": "낚시춘추 · 김진현 기자 & 최영교 프로",
        "url": "https://m.fishingseasons.co.kr/news_Detail.asp?b_no=3708",
        "quote": "배스의 활성이 낮을 때 가장 효과적인 루어를 꼽으라면 스몰러버지그를 들 수 있다... 1/8온스 이하의 가벼운 무게로 천천히 폴링하며, 바닥에 멈춰 있을 때도 실리콘 스커트가 물의 흐름에 따라 미세하게 움직여 배스의 입질을 유도한다."
      },
      {
        "authority": "낚시춘추 · 최영교 프로 (스몰러버지그 4대 액션)",
        "url": "https://m.fishingseasons.co.kr/news_Detail.asp?b_no=8547",
        "quote": "호핑: 바닥에 가라앉힌 스몰러버지그를 20~30cm 높이로 톡톡 두 번 정도 튀어 오르게 한 뒤 다시 바닥에 가라앉혀 10초 정도 기다린다... 드래깅: 활성도가 극도로 낮을 때 바닥에서 루어를 띄우지 않고 50cm 정도 천천히 끈 다음 30초 정도 길게 스테이한다."
      },
      {
        "authority": "Wired2Fish · Sam Hanggi",
        "url": "https://www.wired2fish.com/bass-fishing/winter-bass-lures",
        "quote": "In clear water with high skies, a small finesse jig (5/16 to 3/8 oz) trimmed down with a compact craw trailer crawled slowly on rocky banks gets bites when nothing else will."
      }
    ],
    "sourceCount": 3
  },
  {
    "id": "r28_korea_spring_flatland_longcast_freerig",
    "title": "한국 봄 평지형 저수지·간척호 40m 장타 프리리그",
    "lureId": "free_rig",
    "when": {
      "season": [
        "spring"
      ],
      "tempRange": [
        11,
        20
      ],
      "struct": [
        "shallow_weed",
        "rock_slope"
      ]
    },
    "effect": {
      "score": 9
    },
    "advice": {
      "colors": [
        "그린펌킨",
        "워터멜론 레드",
        "시나몬 블루플레이크"
      ],
      "weight": "3/8 ~ 1/2 oz (10.5~14g) 고비중 텅스텐 고리봉돌 + MH 베이트 로드 + 12lb 카본 라인",
      "trailer": "3.5~4인치 호그웜 / 크로우웜 / 더블테일 그럽",
      "action": "수심이 얕아 봄 시즌이 계곡형보다 훨씬 빠르게 시작되는 국내 평지형·늪지형 저수지와 간척호에서 40m 이상 장타를 날려, 연안 경계심이 없는 먼 거리 1차 브레이크라인과 수중 험프·수초 뿌리 군락을 탐색"
    },
    "reason": "한국의 평지형 저수지와 간척호는 수심이 완만해 봄 수온이 가장 먼저 오르지만 워킹 낚시인의 발걸음 프레셔로 대형 배스가 연안에서 멀리 떨어져 있습니다. 40m 이상 원투가 가능한 프리리그로 먼 거리 바닥 지형 변화와 수초 군락을 직공하는 것이 봄 마릿수와 대물의 핵심입니다.",
    "sources": [
      {
        "authority": "낚시춘추 · 박기현 KSA 프로 (한국 봄 필드 공식)",
        "url": "https://m.fishingseasons.co.kr/news_Detail.asp?b_no=16185",
        "quote": "계곡형 저수지보다 수심이 얕고 부영양화가 진행된 평지형이나 늪지형 저수지, 혹은 간척호의 수초대가 시즌이 훨씬 빠르게 시작된다... MH 로드에 12lb 플로로카본 라인을 세팅한 프리리그로 40m 이상 장타를 쳐서 먼 거리의 브레이크라인과 바닥 지형 변화를 탐색한다."
      },
      {
        "authority": "낚시춘추 · 김선필 프로",
        "url": "https://m.fishingseasons.co.kr/news_Detail.asp?b_no=3474",
        "quote": "바닥 탐색을 할 때는 무거운 봉돌이 달린 프리 리그를 써야 멀리 캐스팅할 수 있고 바닥을 더 세밀하게 읽어 나갈 수 있다."
      }
    ],
    "sourceCount": 2
  },
  {
    "id": "r29_early_spring_cold_oversized_blade_spinnerbait",
    "title": "초봄 저수온 수초대 대형 블레이드 스피너베이트 초슬로우 롤링",
    "lureId": "spinnerbait",
    "when": {
      "season": [
        "spring",
        "winter"
      ],
      "tempRange": [
        6,
        12
      ],
      "struct": [
        "shallow_weed",
        "heavy_cover"
      ]
    },
    "effect": {
      "score": 9
    },
    "advice": {
      "colors": [
        "화이트 / 차트루즈 화이트",
        "골드/실버 탠덤 또는 대형 콜로라도 블레이드"
      ],
      "weight": "3/8 ~ 1/2 oz (10.5~14.2g) — 순정보다 한 치수 큰 오버사이즈 블레이드 튜닝 (강한 양력과 저속 회전 확보)",
      "trailer": "3.5~4인치 그럽 또는 섀드웜 트레일러",
      "action": "저수온기 배스는 수초에서 30cm 이상 벗어나 루어를 쫓지 않으므로, 양력이 큰 대형 블레이드 스피너베이트로 수초 상단 30cm 이내를 스치듯 극도로 느리게 릴링. 수초 사이 빈 공간(pocket)에서는 감기를 멈춰 수직 프리폴링 바이트 유도"
    },
    "reason": "수온 6~12°C의 이른 봄에 가장 먼저 얕은 수초대로 올라오는 개체는 전부 대형 빅배스입니다. 블레이드를 한 치수 키워 양력(lift)을 높이면 수초에 걸리지 않고 극초저속 릴링이 가능해져 수초 30cm 반경에 붙은 대물의 입을 열 수 있습니다.",
    "sources": [
      {
        "authority": "낚시춘추 · 최석민 프로 (대호만 봄 수초 스피너베이트)",
        "url": "https://m.fishingseasons.co.kr/news_Detail.asp?b_no=2783",
        "quote": "저수온기 배스는 수초에서 30cm 이상 벗어나서 루어를 쫓아오지 않는다... 블레이드를 한 치수 큰 것으로 교체해 양력(Lift)을 높이면, 수초 상단에 걸리지 않으면서도 훨씬 느린 속도로 수초 바로 위를 스치듯 지나가게 할 수 있다. 또한 수초 사이의 빈 공간(포켓)에서는 릴링을 멈추어 수직으로 떨어뜨리는 프리폴링(Free-falling) 액션을 주면 강한 바이트가 들어온다."
      },
      {
        "authority": "Wired2Fish · Shaye Baker",
        "url": "https://www.wired2fish.com/fishing-tips/choosing-the-right-bladed-bait-for-muddy-water",
        "quote": "Cold and muddiest: 3/8-ounce spinnerbait with a large #5 Colorado blade on the back and a smaller #3 Colorado blade in the front... creates maximum thump and allows a slow retrieve."
      }
    ],
    "sourceCount": 2
  },
  {
    "id": "r30_spring_staging_suspending_deep_crank",
    "title": "봄 프리스폰 2~4m 사면 편납 서스펜딩 튜닝 딥크랭크",
    "lureId": "deep_crank",
    "when": {
      "season": [
        "spring"
      ],
      "tempRange": [
        9,
        16
      ],
      "struct": [
        "rock_slope",
        "deep_open"
      ]
    },
    "effect": {
      "score": 8
    },
    "advice": {
      "colors": [
        "크로우 패턴 (레드 크로우 / 브라운 크로우)",
        "내추럴 섀드 / 차트루즈 블루"
      ],
      "weight": "2.5 ~ 4m 잠행 딥크랭크 + 복부 편납(납 스티커 / Zappu 보드 웨이트) 부착으로 슬로우 플로팅·서스펜딩 튜닝",
      "trailer": "10~12lb 플루오로카본 라인",
      "action": "산란 전 배스가 머무는 수심 2~4m 돌사면 바닥을 찍은 뒤 릴링을 멈춰도 급부상하지 않고 제자리에 머물도록 편납 튜닝. 바닥 접촉 후 2~5초 스테이하거나, 초저속 릴링과 초고속 릴링 양극단을 번갈아 구사"
    },
    "reason": "일반 딥크랭크는 부력이 너무 강해 봄철 저수온에서 릴링을 멈추면 쏜살같이 떠올라 배스의 추격 범위를 벗어납니다. 배에 편납을 붙여 물속에서 멈추거나 천천히 떠오르게 튜닝하면 돌에 부딪힌 뒤 멈춘 순간 결정적인 바이트가 들어옵니다.",
    "sources": [
      {
        "authority": "낚시춘추 · 장성호 봄 크랭킹 특집",
        "url": "https://m.fishingseasons.co.kr/news_Detail.asp?b_no=9846",
        "quote": "봄철 배스는 수심 2~4m 권에 머무는 경우가 많아 섈로우 크랭크베이트보다는 딥크랭크베이트가 유리하다... 부력이 강한 크랭크베이트 배 부분에 편납(웨이트 씰)을 붙여 물속에서 서스펜딩(멈춤)하거나 아주 천천히 떠오르는 슬로우 플로팅 상태로 튜닝하면, 바닥 장애물에 부딪힌 뒤 멈췄을 때(스테이) 배스가 덮치는 확률이 비약적으로 높아진다."
      },
      {
        "authority": "Wired2Fish · Jason Sealock",
        "url": "https://www.wired2fish.com/buyers-guides/best-fishing-weights-and-sinker-types",
        "quote": "Adhesive lead strips (like Zappu Board Weights) stuck to the belly of jerkbaits, crankbaits, or swimbaits allow anglers to fine-tune buoyancy so a floating plug suspends or slowly sinks in cold water."
      }
    ],
    "sourceCount": 2
  },
  {
    "id": "r31_autumn_turnover_channel_metal_longjerk",
    "title": "가을 턴오버 수중 채널 메탈지그·바이브 12시 롱저킹",
    "lureId": "metal_vibe",
    "when": {
      "season": [
        "autumn"
      ],
      "tempRange": [
        10,
        18
      ],
      "struct": [
        "deep_open",
        "rock_slope"
      ]
    },
    "effect": {
      "score": 9
    },
    "advice": {
      "colors": [
        "크롬 실버 (Chrome Silver)",
        "골드 & 레드 헤드",
        "아유 / 내추럴 샤드"
      ],
      "weight": "14 ~ 28g (1/2 ~ 1 oz) 메탈지그 또는 메탈바이브",
      "trailer": "바늘걸림 감소를 위한 리어 싱글/더블훅 세팅",
      "action": "가을 턴오버로 수질이 뒤집혀 수중 물골(채널) 경사면 근처에 떠 있는 저활성 배스를 노려 원투 후 착저. 로드를 머리 위 12시 방향까지 크게 들어 올리는 '롱저킹(Long Jerking)' 후, 루어가 수직으로 떨어지도록 적정량의 슬랙라인을 주며 폴링 바이트를 유도"
    },
    "reason": "가을 턴오버가 발생한 한국 저수지(송전지·신갈지 등)에서 배스는 산소와 수온이 상대적으로 나은 수중 채널 턱에 서스펜드한 채 웜과 일반 하드베이트를 모두 외면합니다. 이때 메탈 루어를 12시까지 크게 저킹해 수직 프리폴링시키면 눈앞에서 번쩍이며 떨어지는 금속 파동에 본능적으로 반응합니다.",
    "sources": [
      {
        "authority": "낚시춘추 · 손혁 프로 (가을 턴오버 돌파법)",
        "url": "https://m.fishingseasons.co.kr/news_Detail.asp?b_no=4355",
        "quote": "가을 턴오버가 발생하면 물색이 탁해지고 수면에 거품이 일며 배스들이 바닥에서 떠올라 극도로 예민해진다. 이때 배스들은 수중 물골(채널) 경사면(드롭오프) 근처에 모이는데... 메탈지그나 바이브레이션을 원투해 바닥을 찍은 뒤, 로드를 12시 방향까지 크게 들어 올리는 '롱저킹'을 하고 적당한 슬랙라인을 주어 루어가 수직으로 프리폴링하게 만들면 반사적인 바이트를 받아낼 수 있다."
      },
      {
        "authority": "낚시춘추 · 유해일 KSA 프로",
        "url": "https://m.fishingseasons.co.kr/news_Detail.asp?b_no=13782",
        "quote": "메탈지그: 깊은 수심의 바닥층에 배스들이 모여 있을 때 빠르게 잡아낼 수 있는 루어다. 무게는 21~30g을 주로 사용하고 크롬 컬러를 즐겨 사용하는 편."
      },
      {
        "authority": "Wired2Fish · Jason Sealock",
        "url": "https://www.wired2fish.com/bass-fishing/temperature-based-bass-lure-selector-chart",
        "quote": "Deep & Muddy -> Blade bait (Silver/Gold 1/2 oz)... vibrates hard enough for sluggish bass to track in low visibility."
      }
    ],
    "sourceCount": 3
  },
  {
    "id": "r32_summer_rain_dissolved_oxygen_topwater",
    "title": "한국 여름비 표층 수온 하강·용존산소 급증 섈로우 톱워터",
    "lureId": "top_popper_pencil",
    "when": {
      "season": [
        "summer",
        "autumn"
      ],
      "tempRange": [
        20,
        30
      ],
      "sky": [
        "rain",
        "overcast"
      ],
      "waterTrend": [
        "stable",
        "rising"
      ]
    },
    "effect": {
      "score": 9
    },
    "advice": {
      "colors": [
        "본 (Bone) / 화이트",
        "블랙 / 크롬 (로우라이트 수면 대비)",
        "차트루즈 백"
      ],
      "weight": "7 ~ 14g (1/4 ~ 1/2 oz) 포퍼, 워킹 펜슬베이트, 또는 프롭베이트",
      "trailer": "리어 페더 훅",
      "action": "고수온기 적당한 비가 내려 표층 수온이 식고 용존산소가 급증할 때, 급심으로 내려갈 필요 없이 워킹 연안 섈로우와 새물 유입구 주변 수면을 톱워터로 빠르게 공략 (단, 폭우로 육초가 잠겨 썩거나 농경지 흙탕물이 유입된 직후는 피할 것)"
    },
    "reason": "한국의 한여름 고수온기에 적당한 비가 내리면 ①표층 수온 하강 ②빗방울에 의한 표층 용존산소 증가 ③구름 그늘 형성 ④약탁수로 인한 경계심 해소의 4대 호재가 겹치며 배스가 얕은 워킹 연안 표층으로 대거 부상해 톱워터를 공격합니다.",
    "sources": [
      {
        "authority": "낚시춘추 · 이형근 KSA 프로 (한국 여름비 배스 과학 분석)",
        "url": "https://m.fishingseasons.co.kr/news_Detail.asp?b_no=12621",
        "quote": "여름에 적당한 비가 내리면 1) 표층 수온이 내려가고, 2) 빗방울이 수면을 때리며 용존산소량이 증가하며, 3) 구름이 햇빛을 가려 배스의 경계심을 풀어주고, 4) 물색이 적당히 흐려져 루어를 속이기 쉬워진다. 이때는 깊은 수심을 노릴 필요 없이 워킹으로 얕은 연안에서 톱워터, 웨이크베이트, 섈로우 크랭크베이트, 미노우 같은 하드베이트로 마릿수 조과를 거둘 수 있다."
      },
      {
        "authority": "Wired2Fish · Jason Sealock",
        "url": "https://www.wired2fish.com/bass-fishing/temperature-based-bass-lure-selector-chart",
        "quote": "Water Temp 65-80°F+: Topwater walker, hollow body frog, buzzbait... overcast and low-light conditions pull fish shallow to chase surface baits."
      }
    ],
    "sourceCount": 2
  },
  {
    "id": "r33_coldwater_ditch_bluff_jerkbait",
    "title": "저수온 수중 물골(Ditch)·석축 저크베이트 마이크로 트위칭",
    "lureId": "minnow_jerk",
    "when": {
      "season": [
        "winter",
        "spring"
      ],
      "tempRange": [
        5,
        11
      ],
      "clarity": [
        "clear",
        "stained"
      ],
      "struct": [
        "rock_slope",
        "deep_open"
      ]
    },
    "effect": {
      "score": 9
    },
    "advice": {
      "colors": [
        "베이트피시가 클 때(프로파일 확대): 불투명 본 화이트 (Opaque Bone White)",
        "베이트피시가 작거나 맑은 물(프로파일 축소): 반투명 고스트 미노우 (Translucent Ghost Minnow)",
        "약탁수/봄 물골: 크롬/차트루즈 사이드"
      ],
      "weight": "60~110mm 서스펜딩 저크베이트 (합사 원줄 + 10lb 플루오로카본 리더 4m + 가벼운 브론즈 #4 세단 훅)",
      "trailer": "단독 운용 (7.5:1 이상 고속 기어비 릴로 슬랙 회수)",
      "action": "수온 5~11°C의 이른 봄·겨울 수중 물골(ditch)이나 석축에서 로드를 크게 당기지 말고, 합사+카본 리더 조합으로 로드 팁만 까딱여 루어가 제자리에서 20~25cm(8~10인치)만 좌우로 돌게 한 뒤 5~15초 롱스테이"
    },
    "reason": "저수온기 배스는 산란장 앞 수중 물골을 따라 이동하지만 긴 거리를 추격하지 못합니다. 불투명 본(Bone) 컬러로 실루엣을 키우거나 반투명 고스트 컬러로 실루엣을 줄여 베이트 크기에 맞추고, 20cm 이내 마이크로 트위칭과 긴 스테이를 주어야 코앞에서 바이트를 유도합니다.",
    "sources": [
      {
        "authority": "Wired2Fish · Fred Roumbanis",
        "url": "https://www.wired2fish.com/jerkbait-tips/unconventional-coldwater-jerkbait-tips",
        "quote": "Opaque colors like Bone White make a 4.5-inch jerkbait look larger in clear water, while translucent colors like Ghost Minnow make the same bait appear smaller... Use 30-lb floating braid to a 10-lb fluorocarbon leader so the bait twitches with micro-movements (moving only 8 to 10 inches) while staying in the strike zone longer."
      },
      {
        "authority": "Wired2Fish · Stephen Browning",
        "url": "https://www.wired2fish.com/jerkbait-tips/jerkbait-fishing-ditches-for-early-prespawn-bass",
        "quote": "When the water temperature is in the mid-40s (45°F / 7.2°C), ditches act as highways for prespawn bass... Throw a suspending jerkbait (LiveTarget Yearling Baitball 110) on 10-pound fluorocarbon with a high-speed 7.5:1 reel."
      },
      {
        "authority": "낚시춘추 · 박기현 KSA 프로",
        "url": "https://m.fishingseasons.co.kr/news_Detail.asp?b_no=16185",
        "quote": "스피닝 태클을 이용해 60~90mm(4~6g) 크기의 소형 미노우(숏빌 미노우)를 연안 브레이크라인과 수초 언저리에 저킹&포즈로 운용하면 산란 전후 베이트피시를 사냥하는 배스에게 강한 리액션 바이트를 유도할 수 있다."
      }
    ],
    "sourceCount": 3
  },
  {
    "id": "r34_laydown_two_stage_crank_and_jig",
    "title": "수몰나무(Laydown) 수심별 2단계 공략 & 상단 가지 피칭 지그",
    "lureId": "rubber_jig",
    "when": {
      "struct": [
        "heavy_cover"
      ],
      "clarity": [
        "clear",
        "stained"
      ],
      "tempRange": [
        14,
        30
      ]
    },
    "effect": {
      "score": 9
    },
    "advice": {
      "colors": [
        "그린펌킨",
        "블랙 & 블루",
        "브라운 크로우"
      ],
      "weight": "3/8 ~ 1/2 oz (10.5~14.2g) 아키(Arky) 헤드 또는 플리핑 지그 + 17~20lb 플루오로카본",
      "trailer": "트윈테일 그럽 또는 크로우 트레일러",
      "action": "① 수심 2m(6ft) 이하 섈로우 수몰나무: 먼저 스퀘어빌 크랭크베이트로 바깥쪽 잔가지의 활성 개체를 낚은 뒤 1/2oz 지그로 밑동(trunk)을 피칭 ② 수심 6m(20ft)+ 깊은 직벽 수몰나무: 바닥까지 내리지 말고 나무 수관(crown) 위 가지로 피칭해 1.2~1.5m(4~5ft)만 폴링시킨 뒤 회수"
    },
    "reason": "수몰나무를 처음부터 지그로만 치면 가장자리에 떠 있던 활성 배스가 줄에 놀라 도망칩니다. 또한 깊은 직벽에 쓰러진 나무의 배스는 바닥이 아니라 수관 상단 가지에 서스펜드하므로 가지 위로 1.5m만 폴링시키는 것이 핵심입니다.",
    "sources": [
      {
        "authority": "Wired2Fish · Jamie Horton",
        "url": "https://www.wired2fish.com/spring-fishing-tips/do-you-know-how-to-fish-laydowns-for-big-bass",
        "quote": "Shallow laydowns (6 feet or less): First make several casts around the outside limbs with a squarebill crankbait to catch aggressive fish without spooking the rest of the tree; then pick apart the trunk and heavy forks with a 1/2-ounce jig on 20-pound fluorocarbon. Deep laydowns (20+ feet): Bass suspend in the top crown of the tree rather than on the bottom. Pitch a 1/2-ounce jig over limbs and let it fall only 4 to 5 feet before reeling in."
      },
      {
        "authority": "Wired2Fish · Terry Bolton & Casey Martin",
        "url": "https://www.wired2fish.com/fall-fishing/how-to-fish-isolated-cover-on-drawdowns",
        "quote": "When the water draws down in the fall, there is only so much cover left in the water. Isolated wood (stumps, laydowns, brushpiles) becomes a high-percentage target... 3/8- to 1/2-ounce flipping jig (Green Pumpkin or Black/Blue)."
      }
    ],
    "sourceCount": 2
  },
  {
    "id": "r35_korea_extreme_temp_nosinker_single",
    "title": "한여름 고수온 무풍 그늘 이물감 제로 노싱커 폴링",
    "lureId": "no_sinker",
    "when": {
      "tempRange": [
        26,
        32
      ],
      "clarity": [
        "clear",
        "stained"
      ],
      "wind": [
        "calm"
      ]
    },
    "effect": {
      "score": 0
    },
    "advice": {
      "colors": [
        "워터멜론 시드 (Watermelon Seed)",
        "그린펌킨",
        "시나몬"
      ],
      "weight": "노싱커 (#2/0 ~ #4/0 오프셋 훅 또는 와키 훅 단독) + 6~10lb 플루오로카본",
      "trailer": "4~5인치 고비중 스트레이트 스틱웜 (센코 타입)",
      "action": "수초·수몰나무·수상좌대 그늘 바로 옆에 캐스팅한 뒤 라인 텐션을 완전히 풀어주어 웜 자체 무게로만 수평 흔들림(wobbling)을 내며 천천히 가라앉게 두고, 바닥 착저 후 10초 이상 스테이"
    },
    "reason": "수온이 26°C를 넘고 바람마저 없는 한낮에는 배스의 먹성이 극도로 떨어져 봉돌이 달린 채비의 빠른 폴링과 이물감을 기피합니다. 웜 자체 비중으로만 천천히 수평 폴링하는 노싱커 채비가 그늘 속 저활성 배스에게 가장 확실한 한 입 거리입니다.",
    "sources": [
      {
        "authority": "낚시춘추 · 이달의 채비 (노싱커 리그)",
        "url": "https://m.fishingseasons.co.kr/news_Detail.asp?b_no=3599",
        "quote": "해빙기 저수온이나 한여름 고수온기처럼 배스의 먹성이 극도로 떨어졌을 때는 봉돌의 이물감이 전혀 없고 가장 자연스럽게 천천히 가라앉는 노싱커 리그(No-sinker rig)가 최고의 위력을 발휘한다."
      }
    ],
    "sourceCount": 1
  }
];

const EXPERT_PRINCIPLES = {
  "weightRules": {
    "sourceUrl": "https://www.bassmaster.com/bass-basics/news/the-texas-rig-part-3-weight-selection/",
    "authority": "Bassmaster · Gettys Brannon & 김선필 프로",
    "goldenRule": "자신이 바닥과 루어를 감지할 수 있는 가장 가벼운 무게를 쓰되, 바람·수심·커버·탐색 여부에 따라 즉시 무게를 올린다.",
    "byCondition": {
      "shallow_finesse": {
        "label": "수심 1.5m(5ft) 이하 섈로우 · 수평 글라이딩 폴링",
        "spec": "1/32 ~ 1/8 oz (0.9 ~ 3.5g)",
        "reason": "스틱웜(센코 등)의 수평 폴링 액션을 살리고 얕은 물 배스의 착수음 경계심을 줄임"
      },
      "standard_breakline": {
        "label": "표준 브레이크라인 · 복잡한 수중 장애물 통과",
        "spec": "3/16 ~ 3/8 oz (5.3 ~ 10.5g)",
        "reason": "복잡한 돌·나뭇가지 사이를 걸림 없이 타고 넘으면서 바닥 감도를 유지하는 올라운드 무게"
      },
      "deep_wind_search": {
        "label": "초기 광역 지형 탐색 · 수심 6m(20ft)+ 딥 · 강풍 · 배수기 유속",
        "spec": "3/8 ~ 1/2 oz (10.5 ~ 14.2g)",
        "reason": "강풍에 의한 라인 날림(bow)을 이겨내고 먼 거리 험프·물골 지질을 빠르게 읽어냄 (강풍은 모든 규칙에 최우선)"
      },
      "reaction_stroking": {
        "label": "딥 하드바텀 리액션 스트로킹 · 탁수 부유물 관통",
        "spec": "1/2 ~ 3/4 oz (14.2 ~ 21.3g)",
        "reason": "바닥에서 강하게 낚아채 빠르게 자유 낙하시키는 리액션 바이트 유도 및 부유물 매트 관통"
      },
      "heavy_mat_punching": {
        "label": "한여름·콜드프런트 빽빽한 수초 매트 직공 (펀칭)",
        "spec": "1 ~ 1.5 oz (28 ~ 42.5g) 텅스텐 페깅(고정)",
        "reason": "납보다 부피가 절반 가까이 작은 고밀도 텅스텐을 스토퍼로 고정해야 두꺼운 수초 지붕을 뚫고 그늘 아래 배스 눈앞에 도달"
      }
    }
  },
  "finishMatrix": {
    "sourceUrl": "https://megabassusa.com/selecting-jerkbait-colors/",
    "authority": "Megabass USA & Bassmaster Color Guide",
    "rules": [
      {
        "condition": "맑은 물 + 맑은 날 + 무풍 (하이프레셔)",
        "finish": "GP (반투명 / 고스트 피니시)",
        "examples": "고스트 미노우, 프로 블루, 워터멜론 시드",
        "reason": "시야가 넓고 빛 투과가 강해 인위적인 반사광이 배스를 놀라게 하므로 물속에 스며드는 반투명 실루엣이 필수"
      },
      {
        "condition": "맑은~보통 물색 + 맑은 날 + 바람/잔파도",
        "finish": "GG (메탈릭 / 강한 플래시 피니시)",
        "examples": "크롬/실버 샤드, 카스미 이토, 골드 블랙 백",
        "reason": "파도로 수면 빛이 산란될 때 강한 금속성 반사광(Flash)이 먼 거리의 활성 배스를 유인"
      },
      {
        "condition": "흐린 날·비·로우라이트 또는 보통~탁한 물색 또는 콜드프런트 후",
        "finish": "MAT (무광 매트 / 솔리드 & 하이콘트라스트)",
        "examples": "매트 섀드, 엘레지 본(Bone), 차트루즈/화이트, 블랙 & 블루",
        "reason": "광량이 부족하거나 물이 탁할 때는 반사광보다 배경과 뚜렷하게 구분되는 불투명 윤곽선(대비 실루엣)이 핵심"
      }
    ]
  }
};
