const urlMap = {
    "giay-chay-bo-nam": "Giày chạy bộ nam",
    "giay-cau-long-nam": "Giày cầu lông nam",
    "giay-tay-nam": "Giày tây nam",
    "sandal-nam": "Sandal nam",
    "giay-da-bong-nam": "Giày đá bóng nam",
    "giay-chay-bo-nu": "Giày chạy bộ nữ",
    "giay-cau-long-nu": "Giày cầu lông nữ",
    "giay-cao-got": "Giày cao gót nữ",
    "giay-bup-be": "Giày búp bê nữ",
    "sandal-nu": "Sandal nữ",
    "boot-nu": "Boot nữ",
    "sandal-tre-em": "Sandal kid",
    "dep-tre-em": "Dép kid",
    "giay-the-thao-tre-em": "Giày thể thao kid",
};

export const navs = [
    { title: "Giày chạy bộ", link: "/collections/giay-chay-bo-nam", parent: 0 },
    { title: "Giày cầu lông", link: "/collections/giay-cau-long-nam", parent: 0 },
    { title: "Giày tây", link: "/collections/giay-tay-nam", parent: 0 },
    { title: "Giày đá bóng", link: "/collections/giay-da-bong-nam", parent: 0 },
    { title: "Sandal", link: "/collections/sandal-nam", parent: 0 },
    { title: "Giày chạy bộ", link: "/collections/giay-chay-bo-nu", parent: 1 },
    { title: "Giày cầu lông", link: "/collections/giay-cau-long-nu", parent: 1 },
    { title: "Giày cao gót", link: "/collections/giay-cao-got", parent: 1 },
    { title: "Giày búp bê", link: "/collections/giay-bup-be", parent: 1 },
    { title: "Sandal", link: "/collections/sandal-nu", parent: 1 },
    { title: "Boot", link: "/collections/boot-nu", parent: 1 },
    { title: "Giày thể thao", link: "/collections/giay-the-thao-tre-em", parent: 2 },
    { title: "Sandal", link: "/collections/sandal-tre-em", parent: 2 },
    { title: "Dép", link: "/collections/dep-tre-em", parent: 2 },
]

function findParentNumByLink (link)
{
    let nav = navs.find(nav => nav.link === link);
    return nav?.parent;
} 


export { urlMap, findParentNumByLink };
