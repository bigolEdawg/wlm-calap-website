import Link from 'next/link'

const Navbar = () => {
    return ( 
        <nav>
            <div className="logo">
                <h1>CALAP</h1>
            </div>
            <Link href='/'>Chinese Expulsion</Link>
            <Link href='/stories'>Stories</Link>            
            <Link href='/Stewart'>Stewart Wong</Link>
            <Link href='/GetInvolved'>Get Involved</Link>
        </nav>
     );
}
 
export default Navbar;